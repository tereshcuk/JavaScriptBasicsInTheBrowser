/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
    constructor( element ) {
        this.element = element;
        this.previewImage = document.querySelector('.fluid');
        this.imageList = document.querySelector(".images-list .grid .row");
        this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imageList.addEventListener('dblclick', (ev)=> {
            if (ev.target.tagName.toLowerCase() === "img") {
                this.previewImage.src = ev.target.src;
            }
        });

    this.imageList.addEventListener("click", (ev) => {
            if (ev.target.tagName.toLowerCase() === "img") {
              ev.target.classList.toggle("selected");
            }
            this.checkButtonText();
        });

    let selectBtn = this.element.querySelector('.select-all');
    selectBtn.addEventListener('click', () => {
            let images = Array.from(this.imageList.querySelectorAll('img'));

            if (images.some(child => {return child.classList.contains('selected')})) {
                images.forEach((img) => {
                    img.classList.remove('selected');
                });
            } else {
                images.forEach((img) => {
                    img.classList.add('selected');
                });
            }

            this.checkButtonText();
        });

    let showUploadedFilesBtn = this.element.querySelector('.show-uploaded-files');
        showUploadedFilesBtn.addEventListener('click' , () => {
            const previewModal = App.getModal('filePreviewer');
            let uploadedPreviewer = document.querySelector(".uploaded-previewer-modal .content");
            uploadedPreviewer.innerHTML = '<i class="asterisk loading icon massive"></i>';
            previewModal.open();
            Yandex.getUploadedFiles((el)=>{previewModal.showImages(el)});
        })

    let sendBtn = this.element.querySelector('.send');
    sendBtn.addEventListener('click' , () => {
        const uploaderModal = App.getModal('fileUploader');
        let images = Array.from(this.imageList.querySelectorAll(".selected")).map(el => el.src);
        uploaderModal.open();
        uploaderModal.showImages(images);
        })

  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imageList.innerHTML='';

  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
         
        let selectBtn = this.element.querySelector('.select-all');
        
        if (images.length > 0) {
            selectBtn.classList.remove("disabled");
        } else {
            console.log(images.length);
            selectBtn.classList.add("disabled");
        }

        for (let img of images) {
            let image = `<div class='four wide column ui medium image-wrapper'><img src='${img['url']}'/></div>`;
            this.imageList.insertAdjacentHTML('beforeend', image);
        }

  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    
        let images = Array.from(this.imageList.querySelectorAll('img'));
        let selectBtn = this.element.querySelector('.select-all');
        let sendBtn = this.element.querySelector('.send');

        if (images.some(child => {return child.classList.contains('selected')})) {
            selectBtn.textContent = 'Снять выделение';
            sendBtn.classList.remove('disabled');
        } else {
            selectBtn.textContent = 'Выбрать всё';
            if (!sendBtn.classList.contains('disabled')) {
                sendBtn.classList.add('disabled');
            }
        }

  }

}