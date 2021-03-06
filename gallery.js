const imageData = [
    // lets pretend this is from an API
    {
        file: 'https://cdn.pixabay.com/photo/2017/07/17/23/51/wormhole-2514312_1280.jpg',
        title: 'Wormhole'
    },
    {
        file: 'https://cdn.pixabay.com/photo/2018/04/06/11/21/office-3295556_1280.jpg',
        title: 'Lorem ipsum dolor sit a met'
    },
    {
        file: 'https://cdn.pixabay.com/photo/2017/10/17/19/11/fantasy-2861815_1280.jpg',
        title: 'Eritipikkjasuurtohutultvõimassõna mis võiks breakida normaalselt'
    },
    {
        file: 'https://cdn.pixabay.com/photo/2016/03/26/13/09/cup-of-coffee-1280537_1280.jpg',
        title: 'Cup of coffee'
    },
    {
        file: 'https://cdn.pixabay.com/photo/2017/01/06/13/50/smartphone-1957740_960_720.jpg',
        title: 'Man holding smartphone'
    },
    
];

//helper because i don't want to write document.queryselector so much

const qs = element => {
    return document.querySelector(element);
}

class Gallery {
    constructor(galleryElement, imageTemplate, images) {
        this.defaultConfig = {
            galleryElement: '',
            imageTemplate: '',
            images: [],
        };
        this.currentIndex = 0;
        this.config = Object.assign(
            {}, this.defaultConfig,
            {
                galleryElement,
                images,
                imageTemplate
            }
        );
        console.log(this.config.images.length);
        this.generateImages(
            this.config.galleryElement,
            this.config.imageTemplate,
            this.config.images
        );
        const imageModal = qs('.Modal--image');
        const imageModalNavNext = imageModal.querySelector('.Button--next');
        const imageModalNavPrev = imageModal.querySelector('.Button--prev');
        const imageModalCloseButton = imageModal.querySelector('.Button--close');
        imageModalNavNext.addEventListener('click', () => {
            this.nextImage();
        });
        imageModalNavPrev.addEventListener('click', () => {
            this.prevImage();
        });
        imageModalCloseButton.addEventListener('click', () => {
            this.closeModal(imageModal);
        });
    }
    nextImage() {
        if (this.currentIndex + 1 > this.config.images.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex += 1;
        }
        this.changeModalImage(this.config.images[this.currentIndex]);
    }
    prevImage() {
        if (this.currentIndex - 1 < 0) {
            this.currentIndex = this.config.images.length - 1;
        } else {
            this.currentIndex -= 1;
        }
        this.changeModalImage(this.config.images[this.currentIndex]);
    }
    generateImages(galleryElement, imageTemplate, images) {
        const gallery = qs(galleryElement);
        images.forEach(
            image => {
                const template = qs(imageTemplate).content.cloneNode(true);
                template.querySelector('.Image').addEventListener('click', () => { 
                    this.openModal(image)}
                );
                const templateImage = template.querySelector('img');
                templateImage.setAttribute('src', image.file);
                templateImage.setAttribute('alt', image.title);
                gallery.appendChild(template);
            }
        );
    }
    openModal(image) {
        const imageModal = qs('.Modal--image');
        // traversing the dom in vanilla js sucks
        const imageModalImage = imageModal.querySelector('img');
        imageModal.querySelector('h3').innerText = image.title;
        imageModalImage.setAttribute('src', image.file);
        imageModalImage.setAttribute('alt', image.title);
        this.currentIndex = imageData.indexOf(image);
        imageModal.showModal();
    }
    closeModal(modalNode) {
        modalNode.close();
    }
    changeModalImage(image) {
        const imageModal = qs('.Modal--image');
        const imageModalImage = imageModal.querySelector('img');
        imageModal.querySelector('h3').innerText = image.title;
        imageModalImage.setAttribute('src', image.file);
        imageModalImage.setAttribute('alt', image.title);
    }
}

let g = new Gallery('.Gallery', '.image-template', imageData);