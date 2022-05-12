import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHeaderResponse,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { first, mergeMap, map, catchError } from 'rxjs/operators';
import { ClientsService } from './clients.service';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { TranslateService } from '@ngx-translate/core';

export interface FileError {
  status: boolean;
  type: string;
  id: string;
}

export interface SingleFile {
  // fileId: string;
  fileId: number | null;
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
  allUploadFiles: any[] = [];
  public FileBaseUrl = environment.fileBaseUrl;
  // private BaseUrl = 'http://10.1.1.165:88';

  constructor(
    private xhttp: HttpClient,
    public clientsService: ClientsService,
    private alert: AlertService,
    private translate: TranslateService
  ) {}

  public UploaderFiles = new BehaviorSubject<Array<any>>([]);
  currentUploaderFiles = this.UploaderFiles.asObservable();

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
          fileId: null,
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
          `${this.FileBaseUrl}/file/upload`,
          DataPayload,
          {
            observe: 'events',
            reportProgress: true,
            // headers: new HttpHeaders({ timeout: `${1000}` }),
          }
        );
        res.subscribe(
          (data: any) => {
            if (data.type === HttpEventType.UploadProgress) {
              progress = Math.round((100 * data.loaded) / data.total);
              this.UploaderFiles.value[index].fileUploaded = progress;
            } else if (data instanceof HttpResponse) {
              // const temp = data.body;
              this.UploaderFiles.value[index].fileId =
                data.body.file_details[0].id;
              resolve(data);
            } else if (data instanceof HttpHeaderResponse) {
              if (data.status === 500) {
                console.log('Загрузка файлов 500 ошибка', data);
                this.UploaderFiles.next([]);
                // this.alert.danger(error.error.message);

                reject({
                  status: false,
                  id: 'none',
                  type: 'server',
                });
              } else if (data.status === 400) {
                console.log('Загрузка файлов 400 ошибка', data);
                this.UploaderFiles.next([]);
                reject({
                  status: false,
                  id: 'none',
                  type: 'server',
                });
              }
            }
          },
          (error) => {
            console.log('error', error);

            this.alert.danger(error.message);
            this.UploaderFiles.next([]);
            this.allUploadFiles = [];
          }
        );
      } catch (error: any) {
        console.warn(error);
        this.alert.danger(
          error.error.message || error.statusText === 'Unknown Error'
            ? this.translate.instant('serverError')
            : error.message
        );
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

  transformFilesData() {
    const files = this.allUploadFiles.map((file) => {
      return {
        id: file.fileId,
        name: file.fileName,
      };
    });

    this.UploaderFiles.next([]);
    this.allUploadFiles = [];

    return files;
  }

  downloadFile(id: number): Observable<any> {
    return this.xhttp.get(
      `${environment.fileBaseUrl}/file/downloadById?id=${id}`,
      // `http://10.1.1.200:3000/file/download/12`,
      { observe: 'body', responseType: 'arraybuffer' }
    );
  }

  //Last Version
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('source', 'Justice');
    formData.append('files', file);
    const req = new HttpRequest(
      'POST',
      `${this.FileBaseUrl}/file/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.xhttp.request(req);
  }
}
