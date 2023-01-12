const { createApp } = Vue

createApp({
    data() {
        return {
            loading:        true,
            upcoming:       false,
            past:           false,
            title:          document.title,
            currentDate:    '',
            bgGradient:     '',
            inputSearch:    '',
            upcomingEvents: [],
            pastEvents:     [],
            events:         [],
            filteredEvents: [],
            categories:     [],
            checked:        [],
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(json => {
                this.currentDate    = new Date(json['currentDate'])
                this.events         = json.events
                this.filteredEvents = this.events
                if (this.title.includes('Home')) {
                    this.upcoming = false
                    this.past     = false
                } 
                else if (this.title.includes('Upcoming')) {
                    this.upcomingEvents = this.events.filter(event => {
                        this.upcoming   = true
                        const eventDate = new Date(event.date)
                        return eventDate > this.currentDate
                    })
                    this.filteredEvents = this.upcomingEvents
                } else if (this.title.includes('Past')) {
                    this.filteredEvents = this.events
                    this.pastEvents     = this.events.filter(event => {
                        this.past       = true
                        const eventDate = new Date(event.date)
                        return eventDate < this.currentDate
                    })
                    this.filteredEvents = this.pastEvents
                }
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
            if (this.upcoming) {
                console.log(this.upcomingEvents)
                let filteredByCategory = this.upcomingEvents.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
                let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(this.inputSearch.toLowerCase()))
                this.filteredEvents    = filteredBySearch
            } else if (this.past) {
                let filteredByCategory = this.pastEvents.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
                let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(this.inputSearch.toLowerCase()))
                this.filteredEvents    = filteredBySearch
            } else {
                let filteredByCategory = this.events.filter(event => this.checked.includes(event.category) || this.checked.length === 0)
                let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(this.inputSearch.toLowerCase()))
                this.filteredEvents    = filteredBySearch
            }
        }
    }
}).mount('#app')