import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

const sdk = require("node-appwrite");

export class Service {
  client = new sdk.Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
      .setKey(conf.appwriteApiKey);

    const tablesDB = new sdk.TablesDB(client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    tags = [],
  }) {
    try {
      const response = await tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.tableId,
        rowId: sdk.ID.unique(),
        data: {
          title: title,
          slug: slug,
          content: content,
            featuredImage: featuredImage,
            status: status || "active",
            userId: userId,
            tags: tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
      });
      console.log("Appwrite service :: createPost :: response", response);
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(
    documentId,
    { title, content, featuredImage, status, tags }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          title,
          content,
          featuredImage,
          status,
          tags,
          updatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      throw error;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      throw error;
    }
  }

  async getPosts(options = {}) {
    try {
      const queries = [
        Query.equal("status", options.status || "active"),
        ...(options.userId ? [Query.equal("userId", options.userId)] : []),
        ...(options.tag ? [Query.search("tags", options.tag)] : []),
        Query.orderDesc(options.orderBy || "createdAt"),
        Query.limit(options.limit || 10),
        ...(options.offset ? [Query.offset(options.offset)] : []),
      ].filter(Boolean);

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      throw error;
    }
  }

  // New method to search posts
  async searchPosts(searchTerm, options = {}) {
    try {
      const queries = [
        Query.search("title", searchTerm),
        Query.search("content", searchTerm),
        ...(options.status ? [Query.equal("status", options.status)] : []),
        Query.limit(options.limit || 10),
        Query.orderDesc("createdAt"),
      ];

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: searchPosts :: error", error);
      throw error;
    }
  }

  // New method to get posts by tag
  async getPostsByTag(tag, limit = 10) {
    try {
      const queries = [
        Query.search("tags", tag),
        Query.equal("status", "active"),
        Query.limit(limit),
        Query.orderDesc("createdAt"),
      ];

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPostsByTag :: error", error);
      throw error;
    }
  }

  // File upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
