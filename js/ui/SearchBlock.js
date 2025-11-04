/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    
    let input = this.element.querySelector('input');
    let replaceBtn = this.element.querySelector('.replace');
    let addBtn = this.element.querySelector('.add');

    replaceBtn.addEventListener('click', () => {
      if (input.value) {
        App.imageViewer.clear();
        VK.get(input.value, callback);
      }
    })

             
    addBtn.addEventListener('click', () => {
      if (input.value) {
        VK.get(input.value, callback);
        }
      })
  }

}

function callback(result) {
    let images = VK.processData(result);    
    if (images.length > 0) {
        App.imageViewer.drawImages(images);
    }
    
    
}