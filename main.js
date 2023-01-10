const { createApp } = Vue

createApp({
    data() {
        return {
            loading: true,
            events: [],
            categories: [],
            bgGradient: ''
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(json => {
                this.events = json.events
                console.log(this.events)
                this.categories = [... new Set(json.events.map(event => event.category))]
                console.log(this.categories)
            })
            .catch(err => console.log(error))
            .finally(() => {
                this.loading    = false
                this.bgGradient = 'bg-grey-gradient'
            })
    }, 
    methods: {
        // crossFilter() {
        //     let filteredByCategory = events.filter(event => checked.includes(event.category) || checked.length === 0)
        //     let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
        //   }
    }
}).mount('#app')