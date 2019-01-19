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
        this.generateImages(
            this.config.galleryElement,
            this.config.imageTemplate,
            this.config.images
        );
    }
    nextImage() {
        this.currentIndex + 1 > this.config.images.length
        ? this.currentIndex = 0
        : this.currentIndex += 1;
    }
    prevImage() {
        this.currentIndex - 1 < 0
        ? this.currentIndex = this.config.images.length
        : this.currentIndex -= 1;
    }
    generateImages(galleryElement, imageTemplate, images) {
        const gallery = qs(galleryElement);
        images.forEach(
            image => {
                const template = qs(imageTemplate).content.cloneNode(true);
                const templateInner = this.getNodeChildWithClass(template, 'Image');
                templateInner.addEventListener('click', () => { 
                    this.openModal(image)}
                );
                const templateImage = this.getNodeChildWithNodeName(templateInner, 'IMG');
                templateImage.setAttribute('src', image.file);
                templateImage.setAttribute('alt', image.title);
                gallery.appendChild(template);
            }
        );
    }
    openModal(image) {
        const imageModal = qs('.Modal--image');
        const imageModalHeader = this.getNodeChildWithClass(imageModal, 'Modal__footer');
        this.getNodeChildWithNodeName(imageModalHeader, 'H3').innerText = image.title;
        const imageModalInner = this.getNodeChildWithClass(imageModal, 'Modal__inner');
        const imageModalImage = this.getNodeChildWithNodeName(imageModalInner, 'IMG');
        imageModalImage.setAttribute('src', image.file);
        imageModalImage.setAttribute('alt', image.title);
        imageModal.showModal();
    }
    getNodeChildWithClass(node, className) {
        return Array.from(node.childNodes).filter(
            el => el.className ? el.className.match(className) : false
        )[0];
    }
    getNodeChildWithNodeName(node, nodeName) {
        return Array.from(node.childNodes).filter(
            el => el.nodeName === nodeName
        )[0];
    }
}

new Gallery('.Gallery', '.image-template', imageData);