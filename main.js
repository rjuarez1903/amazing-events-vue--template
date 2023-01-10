const { createApp } = Vue

createApp({
    data() {
        return {
            loading: true,
            title: document.title,
            events: [],
            filteredEvents: [],
            categories: [],
            bgGradient: '',
            inputSearch: '',
            checked: []
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(json => {
                this.events = json.events
                this.filteredEvents = this.events
                this.categories = [... new Set(json.events.map(event => event.category))]
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.loading    = false
                this.bgGradient = 'bg-grey-gradient'
            })
    }, 
    methods: {
        crossFilter: function() {
              console.log('Working')
              console.log(this.checked)
              console.log(this.title)
              let filteredByCategory = this.events.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
              let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(this.inputSearch.toLowerCase()))
              this.filteredEvents = filteredBySearch
          }
    }
}).mount('#app')