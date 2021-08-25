const TypeWriter = function(textEle, words, wait){
    this.textEle = textEle;
    this.words = words;
    this.wait = wait;
    this.txt = '';
    this.wordIndex = 0;
    isDeleting = false;
    this.type();
}

TypeWriter.prototype.type = function() {
    const currentIndex = this.wordIndex % this.words.length;
    const fullText = this.words[currentIndex]
    if(this.isDeleting){
        this.txt = fullText.substring(0,this.txt.length - 1)
    }else{
        this.txt = fullText.substring(0,this.txt.length + 1)
    }
    this.textEle.innerHTML = `<span class="txt">${this.txt}</span>`
    let typeSpeed = 200;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullText){
        typeSpeed = this.wait;
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 50
    }
    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init)

function init(){
    const textEle = document.querySelector('.text')
    const words = JSON.parse(textEle.getAttribute('data-words'))
    const wait = textEle.getAttribute('data-wait')

    new TypeWriter(textEle, words, wait)
}