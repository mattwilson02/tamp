import { BlobServiceClient, type ContainerClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

const CONTAINERS = {
  attempts: 'attempt-photos',
  avatars: 'avatars',
} as const;

@Injectable()
export class StorageService {
  private readonly blobServiceClient: BlobServiceClient;

  constructor(private readonly config: ConfigService) {
    const connectionString = this.config.getOrThrow<string>('AZURE_STORAGE_CONNECTION_STRING');
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  }

  private container(name: keyof typeof CONTAINERS): ContainerClient {
    return this.blobServiceClient.getContainerClient(CONTAINERS[name]);
  }

  async uploadAttemptPhoto(userId: string, file: Buffer, mimeType: string): Promise<string> {
    const ext = mimeType.split('/')[1] ?? 'jpg';
    const blobName = `${userId}/${Date.now()}.${ext}`;
    const client = this.container('attempts').getBlockBlobClient(blobName);
    await client.uploadData(file, { blobHTTPHeaders: { blobContentType: mimeType } });
    return client.url;
  }

  async uploadAvatar(userId: string, file: Buffer, mimeType: string): Promise<string> {
    const ext = mimeType.split('/')[1] ?? 'jpg';
    const blobName = `${userId}.${ext}`;
    const client = this.container('avatars').getBlockBlobClient(blobName);
    await client.uploadData(file, { blobHTTPHeaders: { blobContentType: mimeType } });
    return client.url;
  }
}
