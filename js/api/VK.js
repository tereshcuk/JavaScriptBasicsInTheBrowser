/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';  
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){

    this.lastCallback = callback;

    const script = document.createElement('script');
    script.src = "https://api.vk.com/method/photos.get?" + 
        `access_token=${this.ACCESS_TOKEN}&v=5.199&`+ 
        `album_id=profile&owner_id=${id}&callback=callback`;

    script.id ='photos_vk';
    document.body.appendChild(script);

  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static getMaxSize(photos) {
        let photosType = ['w', 'z', 'y', 'r', 'q', 'p', 'o', 'x', 'm', 's'];
        for (const type of photosType) {
            if (photos[type]) {              
                return photos[type];
                          }
        }
    }

  static processData(result){
    let photosWithMaxSize = [];
    let photos_vk = document.querySelector('#photos_vk');
     try {
      if (photos_vk) {
        photos_vk.remove();
        }

        } catch(e) {          
            alert(`Ошибка ${e.name} : ${e.message}`);
        }
        
        for (const item of result.response.items) {
            let siz = {};
            for (const [id, size] of item.sizes.entries()) {
                siz[size.type] = id;
            }
            photosWithMaxSize.push(item.sizes[this.getMaxSize(siz)]);
        }
        return photosWithMaxSize;

       

  }
}
