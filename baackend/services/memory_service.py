import os
import json
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional, Union
from pydantic import BaseModel, Field
from flask import jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import numpy as np
from numpy.linalg import norm
import logging

# Import vector database client (example using FAISS, but you can replace with any vector DB)
try:
    import faiss
    from sentence_transformers import SentenceTransformer
    HAS_FAISS = True
except ImportError:
    HAS_FAISS = False

# Define data models
class MemoryItem(BaseModel):
    """Represents a single memory item with vector embedding"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    content: str
    embedding: Optional[List[float]] = None
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[str] = None
    collection: str = "default"
    tags: List[str] = []

class MemoryQueryResult(BaseModel):
    """Represents a search result with similarity score"""
    item: MemoryItem
    score: float

class MemoryService:
    def __init__(self, app=None):
        self.embedding_model = None
        self.vector_dim = 384  # Default dimension for all-MiniLM-L6-v2
        self.collections = {}
        self.index = None
        self.memories = {}
        self.index_file = "memory_index.faiss"
        self.metadata_file = "memory_metadata.json"
        
        if app is not None:
            self.init_app(app)
    
    def init_app(self, app):
        """Initialize the memory service with app configuration"""
        self.embedding_model_name = app.config.get(
            'MEMORY_EMBEDDING_MODEL', 
            'sentence-transformers/all-MiniLM-L6-v2'
        )
        self.index_file = app.config.get('MEMORY_INDEX_FILE', self.index_file)
        self.metadata_file = app.config.get('MEMORY_METADATA_FILE', self.metadata_file)
        
        # Initialize embedding model
        self._init_embedding_model()
        
        # Load existing index and metadata if they exist
        self._load_index()
        
        # Create default collection if it doesn't exist
        if "default" not in self.collections:
            self.create_collection("default")
    
    def _init_embedding_model(self):
        """Initialize the sentence transformer model for embeddings"""
        if not HAS_FAISS:
            current_app.logger.warning(
                "FAISS or sentence-transformers not installed. "
                "Memory service will run in limited mode."
            )
            return
            
        try:
            self.embedding_model = SentenceTransformer(self.embedding_model_name)
            self.vector_dim = self.embedding_model.get_sentence_embedding_dimension()
        except Exception as e:
            current_app.logger.error(f"Failed to initialize embedding model: {str(e)}")
            self.embedding_model = None
    
    def _load_index(self):
        """Load existing index and metadata from disk"""
        try:
            if os.path.exists(self.index_file) and os.path.exists(self.metadata_file):
                # Load FAISS index
                self.index = faiss.read_index(self.index_file)
                
                # Load metadata
                with open(self.metadata_file, 'r') as f:
                    data = json.load(f)
                    self.memories = {k: MemoryItem(**v) for k, v in data.get('memories', {}).items()}
                    self.collections = data.get('collections', {})
                
                current_app.logger.info(f"Loaded {len(self.memories)} memories from disk")
            else:
                self._create_new_index()
                
        except Exception as e:
            current_app.logger.error(f"Error loading index: {str(e)}")
            self._create_new_index()
    
    def _save_index(self):
        """Save the current index and metadata to disk"""
        if not HAS_FAISS or self.index is None:
            return
            
        try:
            # Save FAISS index
            faiss.write_index(self.index, self.index_file)
            
            # Save metadata
            data = {
                'memories': {k: v.dict() for k, v in self.memories.items()},
                'collections': self.collections
            }
            
            with open(self.metadata_file, 'w') as f:
                json.dump(data, f, default=str)
                
        except Exception as e:
            current_app.logger.error(f"Error saving index: {str(e)}")
    
    def _create_new_index(self):
        """Create a new empty index"""
        if not HAS_FAISS:
            return
            
        self.index = faiss.IndexFlatL2(self.vector_dim)
        self.memories = {}
        self.collections = {"default": {"count": 0, "created_at": datetime.utcnow().isoformat()}}
        self._save_index()
    
    def create_collection(self, name: str, metadata: Optional[Dict] = None) -> bool:
        """Create a new collection for organizing memories"""
        if name in self.collections:
            return False
            
        self.collections[name] = {
            "count": 0,
            "created_at": datetime.utcnow().isoformat(),
            "metadata": metadata or {}
        }
        self._save_index()
        return True
    
    def delete_collection(self, name: str) -> bool:
        """Delete a collection and all its memories"""
        if name not in self.collections or name == "default":
            return False
            
        # Find and delete all memories in this collection
        to_delete = [id for id, mem in self.memories.items() if mem.collection == name]
        for mem_id in to_delete:
            self.delete_memory(mem_id)
            
        del self.collections[name]
        self._save_index()
        return True
    
    def add_memory(
        self, 
        content: str, 
        metadata: Optional[Dict] = None, 
        collection: str = "default",
        tags: Optional[List[str]] = None,
        user_id: Optional[str] = None
    ) -> Optional[MemoryItem]:
        """Add a new memory with automatic embedding"""
        if not self.embedding_model:
            return None
            
        # Create embedding
        embedding = self.embedding_model.encode(content, convert_to_numpy=True).tolist()
        
        # Create memory item
        memory = MemoryItem(
            content=content,
            embedding=embedding,
            metadata=metadata or {},
            collection=collection,
            tags=tags or [],
            user_id=user_id
        )
        
        # Add to in-memory storage
        self.memories[memory.id] = memory
        
        # Update collection count
        if collection not in self.collections:
            self.create_collection(collection)
        self.collections[collection]["count"] += 1
        
        # Add to FAISS index if available
        if HAS_FAISS and self.index is not None:
            vector = np.array([embedding], dtype='float32')
            self.index.add(vector)
            self._save_index()
        
        return memory
    
    def get_memory(self, memory_id: str) -> Optional[MemoryItem]:
        """Retrieve a memory by ID"""
        return self.memories.get(memory_id)
    
    def update_memory(
        self, 
        memory_id: str, 
        content: Optional[str] = None,
        metadata: Optional[Dict] = None,
        tags: Optional[List[str]] = None
    ) -> Optional[MemoryItem]:
        """Update an existing memory"""
        if memory_id not in self.memories:
            return None
            
        memory = self.memories[memory_id]
        
        if content is not None:
            memory.content = content
            if self.embedding_model:
                memory.embedding = self.embedding_model.encode(content, convert_to_numpy=True).tolist()
        
        if metadata is not None:
            memory.metadata.update(metadata)
            
        if tags is not None:
            memory.tags = tags
            
        memory.updated_at = datetime.utcnow()
        self._save_index()
        
        return memory
    
    def delete_memory(self, memory_id: str) -> bool:
        """Delete a memory by ID"""
        if memory_id not in self.memories:
            return False
            
        # Update collection count
        memory = self.memories[memory_id]
        if memory.collection in self.collections:
            self.collections[memory.collection]["count"] = max(0, self.collections[memory.collection].get("count", 1) - 1)
        
        # Remove from memory store
        del self.memories[memory_id]
        
        # Note: FAISS doesn't support item deletion, so we'll need to rebuild the index
        if HAS_FAISS and self.index is not None and len(self.memories) > 0:
            self._rebuild_index()
        
        self._save_index()
        return True
    
    def _rebuild_index(self):
        """Rebuild the FAISS index from current memories"""
        if not HAS_FAISS or not self.memories:
            return
            
        # Create new index
        self.index = faiss.IndexFlatL2(self.vector_dim)
        
        # Add all embeddings to the new index
        embeddings = []
        for mem in self.memories.values():
            if mem.embedding:
                embeddings.append(mem.embedding)
        
        if embeddings:
            self.index.add(np.array(embeddings, dtype='float32'))
    
    def search(
        self, 
        query: str, 
        collection: Optional[str] = None,
        user_id: Optional[str] = None,
        tags: Optional[List[str]] = None,
        limit: int = 5,
        threshold: float = 0.7
    ) -> List[MemoryQueryResult]:
        """Search for similar memories using semantic search"""
        if not self.embedding_model or not self.memories:
            return []
            
        # Get query embedding
        query_embedding = self.embedding_model.encode(query, convert_to_numpy=True)
        
        # Filter memories by collection, user_id, and tags
        memories_to_search = []
        for mem in self.memories.values():
            if collection is not None and mem.collection != collection:
                continue
            if user_id is not None and mem.user_id != user_id:
                continue
            if tags and not any(tag in mem.tags for tag in tags):
                continue
            if mem.embedding:
                memories_to_search.append(mem)
        
        if not memories_to_search:
            return []
        
        # Calculate similarities
        results = []
        query_embedding_np = np.array(query_embedding, dtype='float32')
        
        for mem in memories_to_search:
            mem_embedding = np.array(mem.embedding, dtype='float32')
            # Calculate cosine similarity
            similarity = np.dot(query_embedding_np, mem_embedding) / (
                norm(query_embedding_np) * norm(mem_embedding) + 1e-10
            )
            
            if similarity >= threshold:
                results.append(MemoryQueryResult(item=mem, score=float(similarity)))
        
        # Sort by score (descending)
        results.sort(key=lambda x: x.score, reverse=True)
        
        return results[:limit]

# Initialize the service instance
memory_service = MemoryService()

def create_memory_routes(bp):
    """Create memory service API routes"""
    
    @bp.route('/memory', methods=['POST'])
    @jwt_required()
    def add_memory_route():
        data = request.get_json()
        
        if 'content' not in data:
            return jsonify({
                'success': False,
                'message': 'content is required'
            }), 400
            
        memory = memory_service.add_memory(
            content=data['content'],
            metadata=data.get('metadata'),
            collection=data.get('collection', 'default'),
            tags=data.get('tags'),
            user_id=get_jwt_identity()
        )
        
        if not memory:
            return jsonify({
                'success': False,
                'message': 'Failed to add memory'
            }), 500
            
        return jsonify({
            'success': True,
            'data': memory.dict()
        }), 201
    
    @bp.route('/memory/search', methods=['POST'])
    @jwt_required()
    def search_memories():
        data = request.get_json()
        
        if 'query' not in data:
            return jsonify({
                'success': False,
                'message': 'query is required'
            }), 400
            
        results = memory_service.search(
            query=data['query'],
            collection=data.get('collection'),
            user_id=get_jwt_identity(),
            tags=data.get('tags'),
            limit=int(data.get('limit', 5)),
            threshold=float(data.get('threshold', 0.7))
        )
        
        return jsonify({
            'success': True,
            'data': [{
                'item': result.item.dict(),
                'score': result.score
            } for result in results]
        })
    
    @bp.route('/memory/<memory_id>', methods=['GET'])
    @jwt_required()
    def get_memory_route(memory_id):
        memory = memory_service.get_memory(memory_id)
        
        if not memory:
            return jsonify({
                'success': False,
                'message': 'Memory not found'
            }), 404
            
        # Only allow access to the user's own memories
        if memory.user_id != get_jwt_identity():
            return jsonify({
                'success': False,
                'message': 'Unauthorized'
            }), 403
            
        return jsonify({
            'success': True,
            'data': memory.dict()
        })
    
    @bp.route('/memory/<memory_id>', methods=['PUT'])
    @jwt_required()
    def update_memory_route(memory_id):
        data = request.get_json()
        
        # Verify memory exists and belongs to user
        memory = memory_service.get_memory(memory_id)
        if not memory:
            return jsonify({
                'success': False,
                'message': 'Memory not found'
            }), 404
            
        if memory.user_id != get_jwt_identity():
            return jsonify({
                'success': False,
                'message': 'Unauthorized'
            }), 403
            
        updated_memory = memory_service.update_memory(
            memory_id=memory_id,
            content=data.get('content'),
            metadata=data.get('metadata'),
            tags=data.get('tags')
        )
        
        if not updated_memory:
            return jsonify({
                'success': False,
                'message': 'Failed to update memory'
            }), 500
            
        return jsonify({
            'success': True,
            'data': updated_memory.dict()
        })
    
    @bp.route('/memory/<memory_id>', methods=['DELETE'])
    @jwt_required()
    def delete_memory_route(memory_id):
        # Verify memory exists and belongs to user
        memory = memory_service.get_memory(memory_id)
        if not memory:
            return jsonify({
                'success': False,
                'message': 'Memory not found'
            }), 404
            
        if memory.user_id != get_jwt_identity():
            return jsonify({
                'success': False,
                'message': 'Unauthorized'
            }), 403
            
        success = memory_service.delete_memory(memory_id)
        
        if not success:
            return jsonify({
                'success': False,
                'message': 'Failed to delete memory'
            }), 500
            
        return jsonify({
            'success': True,
            'message': 'Memory deleted successfully'
        })
    
    @bp.route('/memory/collections', methods=['GET'])
    @jwt_required()
    def list_collections():
        return jsonify({
            'success': True,
            'data': memory_service.collections
        })
    
    @bp.route('/memory/collections/<collection_name>', methods=['POST'])
    @jwt_required()
    def create_collection_route(collection_name):
        data = request.get_json() or {}
        
        success = memory_service.create_collection(
            name=collection_name,
            metadata=data.get('metadata')
        )
        
        if not success:
            return jsonify({
                'success': False,
                'message': f'Collection {collection_name} already exists'
            }), 400
            
        return jsonify({
            'success': True,
            'message': f'Collection {collection_name} created successfully'
        }), 201
    
    @bp.route('/memory/collections/<collection_name>', methods=['DELETE'])
    @jwt_required()
    def delete_collection_route(collection_name):
        if collection_name == 'default':
            return jsonify({
                'success': False,
                'message': 'Cannot delete the default collection'
            }), 400
            
        success = memory_service.delete_collection(collection_name)
        
        if not success:
            return jsonify({
                'success': False,
                'message': f'Collection {collection_name} not found'
            }), 404
            
        return jsonify({
            'success': True,
            'message': f'Collection {collection_name} deleted successfully'
        })
    
    return bp
