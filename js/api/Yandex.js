/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    //if (!localStorage.getItem('accessToken')) {
            localStorage.setItem('accessToken', prompt("Введите токен Яндекс диска"));
    //    }

  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){

    createRequest({
            method: 'POST',
            path: '/resources/upload',    
              
            data: {
                path: path,
                url: url
            },
            headers: {
                Authorization: `OAuth ${localStorage.getItem("accessToken")}`,
            },
            callback: callback
        });

  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){

    createRequest({
            method: 'DELETE',
            path: '/resources',
            data: {
                path: path
            },
            headers: {
                Authorization: `OAuth ${localStorage.getItem("accessToken")}`,
            },
            callback: callback
        });

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){

    createRequest({
            method: 'GET',
            path: '/resources/files',
            data: {
                mediaType: "image", 
                limit: 1000000
            },
            headers: {
                Authorization: `OAuth ${localStorage.getItem("accessToken")}`,
            },
            callback: callback
        });

  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){

     const link = document.createElement("a");
        link.href = url;
        link.click();

  }
}
Yandex.getToken();