console.log('Start!')

class MainMenu {
    constructor(triggerSelector, containeerSelector){
        this.trigger = document.querySelector(triggerSelector)
        this.container = document.querySelector(containeerSelector)
        this.init()
    }
    init(){
        this.trigger.addEventListener('click', (e) => {            
            this.container.classList.toggle('mainMenuOpened')
        })
    }
}


class PhotoGallery{
    constructor(){
        this.allComments = [
            'Цей кадр нереально крутий! :)',
            'Ти вмієш дивувати! Кожен кадр - поєднання життєлюбності і краси',
            'Спинися мить, прекрасна ти!',
            'Просто супер! Як тобі це вдається?',
            'Це просто шедевр мистецтва',
            'В цьому штучному світі так приємно знайти щось натуральне))',
            'Клас!!!))',
            'Нереально чудово!',
            'А ти вмієш дивувати ;)',
            'Це фото так і проситься в рамочку на стіну'
        ];        
        this.allDescriptions = [
            'Коли радості немає меж',
            'Любов в кожному пікселі',
            'Фото заряджене позитивом',
            'Зловив дзен',
            'Як мало потрібно для щастя',
            'Знали б ви що в мене на умі! ;)',
            'Show must go on',
            'Good vibes only',
            'My inspiration',
            'On my way to paradise',
            'Що це, якщо не любов? Х)'
        ];
        this.picturesDB = this.generatePicturesDB(25)
        console.log(this.picturesDB)
        this.pictureContainer = document.querySelector('.picturesContainer')
        this.openedPictureContainer = document.querySelector('.openedPictureContainer')
        this.closeButton = document.querySelector('.closeButton')

        this.commentsContainer = document.querySelector('.pictureCommentsContainer') || document.createElement('div');
        this.initEventListeners();
    }
    randomElement(array){
        return array[Math.floor(Math.random() * array.length)]
    }
    generatePicturesDB(number){
        const pictures = []
        
        for (let i = 0; i < number; i++){
            const comments = []
            const commentCount = Math.floor(Math.random() * 5)

            for (let j = 0; j < commentCount; j++)
                comments.push(this.randomElement(this.allComments))

            pictures.push({
                src: `../static/img/photos/${i}.jpg`,
                likes: Math.floor(Math.random() * 100),
                effect: 'none',
                description: this.randomElement(this.allDescriptions),
                comments: comments,
                commentsNumber: comments.length
            })
        }
        return pictures;
    }
    showPictures(){
        const pictureTemplate = document.getElementById('templatePictureExample')
        const pictureExample = pictureTemplate.content.querySelector('.pictureExample')
        this.pictureContainer.innerText = ''

        this.picturesDB.forEach( (photo) => {
            const photoBlock = pictureExample.cloneNode(true)
            photoBlock.querySelector('.pictureImg').src = photo.src;
            photoBlock.querySelector('.pictureImg').style.filter = photo.effect
            photoBlock.querySelector('.pictureComments').innerText = photo.commentsNumber
            photoBlock.querySelector('.pictureStars').innerText = photo.likes

            this. pictureContainer.append(photoBlock)

        })
        // console.log(pictureExample)
    }
    showCheckedPicture(picture){
        console.log(picture);

        this.openedPictureContainer.querySelector('.openedPictureImg').src = picture.src
        this.openedPictureContainer.querySelector('.openedPictureImg').style.filter = picture.effect
        this.openedPictureContainer.querySelector('.descriptionText').innerText = picture.description
        this.openedPictureContainer.querySelector('.pictureStars').innerText = picture.likes
        this.openedPictureContainer.querySelector('.pictureComments').innerText = picture.commentsNumber
        
        const commentTemplate = document.getElementById('commentTemplate')
        const commentExample = commentTemplate.content.querySelector('.commentBlock');
        this.commentsContainer.innerText = '';
        
        picture.comments.forEach( (commentText) => {
            const comment = commentExample.cloneNode(true);
            comment.querySelector('.commentText').innerText = commentText;
            this.commentsContainer.append(comment);
        });

        this.openedPictureContainer.classList.remove('hidden');
    }
    initEventListeners(){
        this.pictureContainer.addEventListener('click', (e) => {            
            if (e.target.classList.contains('pictureImg')) {
                const src = e.target.getAttribute('src');
                const picture = this.picturesDB.find((pic) => pic.src === src)
                if (picture){
                    this.showCheckedPicture(picture);
                }
            }
        });

        this.closeButton.addEventListener('click', (e) => {
            this.openedPictureContainer.classList.add('hidden');
            this.commentsContainer.innerText = '';
        });


        this.randomElement([])

    }
}

class ImageUploader{
    constructor(){
        this.inputUploadFile = document.getElementById('inputUploadFile');
        this.uploadImageOverlay = document.querySelector('.uploadImageOverlay');
        this.uploadImage = document.querySelector('.uploadImage');
        this.uploadEffectFieldset = document.querySelector('.uploadEffectFieldset');
        this.buttonCloseUpload = document.getElementById('uploadCancel');

        this.effectSlider = document.getElementById('effectLevel');
        this.currentEffect = 'none';

        this.submitButton = document.getElementById('uploadSubmit');

        this.initEventListeners();
    }
    initEventListeners(){
        this.inputUploadFile.addEventListener('change', (e) => {    
            const file = e.target.files[0];
            if (file && file.type.includes('image')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.uploadImage.src = reader.result;
                    
                    const labelsEffectSettings = 
                        this.uploadEffectFieldset.querySelectorAll('.uploadEffectPreview');

                    //console.log(labelsEffectSettings, this.uploadEffectFieldset);    
                    labelsEffectSettings.forEach( (label) => {    
                        label.style.backgroundImage = `url(${reader.result})`;
                    });

                    this.uploadImageOverlay.classList.remove('hidden');
                };

                // Enable submit button ?? 
                this.submitButton.removeAttribute('disabled');
                this.submitButton.classList.add('active');
            }
            else {
                alert('Будь ласка, виберіть файл зображення.');
            }
        });

        this.buttonCloseUpload.addEventListener('click', (e) => {
            this.uploadImageOverlay.classList.add('hidden');
        });

        this.uploadEffectFieldset.addEventListener('change', (e) => {
            
            if(e.target.type !== 'radio') return;

            const activeLabel = this.uploadEffectFieldset.querySelector('.inputActive');
            if (activeLabel) activeLabel.classList.remove('inputActive');

            this.uploadEffectFieldset.querySelector(`[for=${e.target.id}]`).classList.add('inputActive');
            this.currentEffect = e.target.value;
            
            const min = parseInt(e.target.min);
            const max = parseInt(e.target.max);
            
            this.effectSlider.min = min;
            this.effectSlider.max = max;
            this.effectSlider.value = min;

            this.applyEffect();
        });

        this.effectSlider.addEventListener('input', (e) => {
            this.applyEffect();
        });
    }
    applyEffect(){
        const value = this.effectSlider.value;
        if (this.uploadImage && this.currentEffect !== 'none'){
            this.uploadImage.style.filter = `${this.currentEffect}(${value}%)`;                                            
        } else if (this.uploadImage) {
            this.uploadImage.style.filter = 'none';
        }
    }
    initValidation(){
        const changeStatusSubmitButton = (active) => {
            if (active) {
                this.submitButton.removeAttribute('disabled');
                this.submitButton.classList.add('active');
            } else {
                this.submitButton.setAttribute('disabled', 'disabled');
                this.submitButton.classList.remove('active');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    new MainMenu('.menuTrigger', '.mainMenuContainer');    
    
    const gallery = new PhotoGallery;
    gallery.showPictures();

    const uploader = new ImageUploader();
});