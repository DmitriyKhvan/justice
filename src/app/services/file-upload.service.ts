import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaderResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { first, mergeMap, map, catchError } from 'rxjs/operators';
import {ClientsService} from './clients.service';
import { environment } from 'src/environments/environment';

export interface FileError {
  status: boolean;
  type: string;
  id: string;
}

export interface SingleFile {
  fileId: string;
  fileName: string;
  fileSize: number;
  filePayload: any;
  fileError: FileError;
  fileUploaded: number;
  fileUploading: boolean;
  fileType: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public FileBaseUrl = environment.fileBaseUrl;
  // private BaseUrl = 'http://10.1.1.165:88';

  constructor(private xhttp: HttpClient, public clientsService: ClientsService) {}

  public UploaderFiles = new BehaviorSubject<Array<any>>([]);
  currentUploaderFiles = this.UploaderFiles.asObservable();

  uploadedFiles: any = [];

  pushFiles(files: Array<SingleFile>): void {
    this.UploaderFiles.next(files);

  }

  public poster(e: any): void {
    const payload = new FormData();
    const payloadFile = e.target.files;
    const LoaderPayload: Array<SingleFile> = [];
    for (const file in payloadFile) {
      if (Object.prototype.hasOwnProperty.call(payloadFile, file)) {
        const temp: SingleFile = {
          fileId: file,
          fileName: payloadFile[file].name,
          fileSize: payloadFile[file].size,
          filePayload: payloadFile[file],
          fileUploaded: 0,
          fileUploading: false,
          fileType: payloadFile[file].type,
          fileError: {
            status:
              payloadFile[file].type !== 'application/pdf' ||
              !/^[\w,\s-.]+\.[A-Za-z]{3}$/.test(payloadFile[file].name),
            type:
              payloadFile[file].type === 'application/pdf'
                ? /^[\w,\s-.]+\.[A-Za-z]{3}$/.test(payloadFile[file].name)
                  ? 'uploading'
                  : 'name'
                : 'format',
            id: file,
          },
        };
        LoaderPayload.push(temp);
      }
    }
    // if (payloadFile[1].type === 'application/pdf') {
    //   payload.append('source', 'KANS');
    //   payload.append('files', payloadFile[1]);
    // }

    this.pushFiles(LoaderPayload);
    // console.log(this.UploaderFiles);
    this.startUpload();
  }

  uploadFile(payload: any, index: number): Promise<any> {
    const DataPayload = new FormData();
    let progress = 0;
    DataPayload.append('source', 'Justice');
    DataPayload.append('files', payload);
    return new Promise((resolve: any, reject: any) => {
      try {
        const res = this.xhttp.post(
          `${this.FileBaseUrl}/file/single-upload`,
          DataPayload,
          {
            observe: 'events',
            reportProgress: true,
          }
        );
        res.subscribe((data: any) => {
          console.log(data);
          if (data.type === HttpEventType.UploadProgress) {
            progress = Math.round((100 * data.loaded) / data.total);
            this.UploaderFiles.value[index].fileUploaded = progress;
          }
          else if (data instanceof HttpResponse) {
            // const temp = data.body;
            // const readyPayload = this.setAsSingleFile(temp);
            resolve(data);
          }
          else if (data instanceof HttpHeaderResponse) {
            if (data.status === 500) {
              reject({
                status: false,
                id: 'none',
                type: 'server',
              });
            } else if (data.status === 400) {
              reject({
                status: false,
                id: 'none',
                type: 'server',
              });
            }
          }
        });
      } catch (error) {
        console.warn(error);
        reject({
          status: false,
          id: 'none',
          type: 'server',
        });
      }
    });
  }

  async startUpload(): Promise<void> {
    // const total = this.UploaderFiles.value
    //   .map((el) => el.fileSize)
    //   .reduce((a, b) => {
    //     return a + b;
    //   });
    for (let i = 0; i < this.UploaderFiles.value.length; i++) {
      const uploaded = await this.uploadFile(
        this.UploaderFiles.value[i].filePayload,
        i
      );
      // console.log(uploaded);
    }
  }
}
