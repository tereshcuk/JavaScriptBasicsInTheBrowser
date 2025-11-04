/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
    constructor( element ) {
        super(element);
        this.uploaderModelWindow = document.querySelector(".file-uploader-modal");
        this.content = this.domElement.querySelector('.content');
        this.closeBtn = this.domElement.querySelector(".close");
        this.sendAllBtn = this.domElement.querySelector(".send-all");
        this.registerEvents();
    }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.closeBtn.addEventListener('click', () => {this.close()});
    this.uploaderModelWindow.querySelector(".header .x").addEventListener('click', () => {this.close()});
    this.sendAllBtn.addEventListener('click', this.sendAllImages.bind(this));
    this.content.addEventListener('click', (ev) => {
        if (ev.target === this.content.querySelector('input')) {
            this.content.classList.remove("error");
        }
        if (ev.target.classList.contains("button") || ev.target.classList.contains("upload")
             ) {
               this.sendImage(ev.target.closest(".image-preview-container"));
             }
        })

  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    
    let imgsList = [];
    images.reverse();
    images.forEach(element => {
    imgsList.push(this.getImageHTML(element)); 
    });
    this.content.innerHTML = imgsList.join('');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {

     return `
        <div class="image-preview-container">
            <img src='${item}' />
            <div class="ui action input">
                <input type="text" placeholder="Путь к файлу">
                <button class="ui button"><i class="upload icon"></i></button>
            </div>
        </div>`

  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {    
        let contentList = Array.from(this.content.querySelectorAll('.image-preview-container'));
        contentList.forEach(el => {this.sendImage(el)});
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {

    const inp = imageContainer.querySelector('input');
        if (!inp.value.trim()) {
            inp.parentNode.classList.add('error');
        } else {
            const url = imageContainer.querySelector('img').src;
            const path = inp.value.trim();
            imageContainer.querySelector(".input").classList.add("disabled");

            Yandex.uploadFile(path, url, () => {
                imageContainer.remove();
                if (this.content.children.length < 1) {
                    this.close()
                }
            })
        }

  }
}