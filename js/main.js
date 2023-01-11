const { createApp } = Vue

createApp({
    data() {
        return {
            loading:        true,
            // upcoming:       false,
            // past:           false,
            currentDate:    '',
            title:           document.title,
            upcomingEvents: [],
            events:         [],
            filteredEvents: [],
            categories:     [],
            bgGradient:     '',
            inputSearch:    '',
            checked:        []
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(json => {
                this.currentDate = new Date(json['currentDate'])
                this.events      = json.events
                if (this.title.includes('Home')) {
                    this.filteredEvents = this.events
                } 
                // else if (this.title == 'Upcoming events') {
                //     this.filteredEvents = this.events.filter(event => {
                //         this.upcoming = true
                //         const eventDate = new Date(event.date)
                //         return eventDate > this.currentDate
                //     })
                // } else if (this.title == 'Past events') {
                //   this.filteredEvents = this.events.filter(event => {
                //       this.past = true
                //       const eventDate = new Date(event.date)
                //       return eventDate < this.currentDate
                //   })
                // }
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
              // if (upcoming) {}
              let filteredByCategory = this.events.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
              let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(this.inputSearch.toLowerCase()))
              this.filteredEvents    = filteredBySearch
          }
    }
}).mount('#app')