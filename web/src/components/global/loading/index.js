import loading from './main.vue'

const Loading = {
    install: function(Vue){
        Vue.component('Loading', loading)
    }
}

export default Loading