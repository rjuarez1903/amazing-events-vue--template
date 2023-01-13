const { createApp } = Vue

createApp({
    data() {
        return {
            bgGradient: '',
            loading:    true,
            events:     undefined,
            finalStats: undefined,
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(data => {
                this.events                = data.events
                const currentDate          = new Date(data['currentDate'])
                const generalStats         = this.getGeneralStats(this.events)
                const upcomingEventsStats  = generalStats.filter(event => new Date(event.date) > currentDate)
                const pastEventsStats      = generalStats.filter(event => new Date(event.date) < currentDate)
                this.finalStats = {
                    upcomingEvents: this.getCategoryStats(upcomingEventsStats),
                    pastEvents:     this.getCategoryStats(pastEventsStats),
                    maxCapacity:    this.getMax(generalStats, 'capacity'),
                    maxAssistance:  this.getMax(pastEventsStats, 'percentageOfAssistance'),
                    minAssistance:  this.getMin(pastEventsStats, 'percentageOfAssistance') 
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.loading    = false
                this.animateHeader()
            })
    }, 
    methods: {
        getGeneralStats: function(events) {
            const stats = events.map(event => {
                return {
                    eventName:              event.name,
                    category:               event.category,
                    capacity:               event.capacity,
                    date:                   event.date,
                    percentageOfAssistance: (((event.assistance || event.estimate) * 100) / event.capacity), 
                    revenue:                ((event.assistance || event.estimate) * event.price)
                }
            })
            return stats
        },
        getCategoryStats: function(stats) {
            categoryStats = stats.reduce((acc, stat) => {
                let aux = Object.assign({}, acc)
                if (aux[stat.category]) {
                    aux[stat.category].revenue += stat.revenue
                    aux[stat.category].assistance += stat.percentageOfAssistance
                } else {
                    aux[stat.category] = {
                        revenue: stat.revenue, 
                        assistance: stat.percentageOfAssistance}
                }
                return aux
            }, {})
            return(categoryStats)
        },
        getMax: function(events, criteria) {
            const max = events.reduce((acc, event) => {
                return acc[criteria] > event[criteria] ? acc : event
            })
            return {eventName: max.eventName, max: max[criteria]}
        },
        getMin: function(events, criteria) {
            const max = events.reduce((acc, event) => {
                return acc[criteria] < event[criteria] ? acc : event
            })
            return {eventName: max.eventName, min: max[criteria]}
        },
        animateHeader() {
            const tl = gsap.timeline({defaults: {duration: 1 }})
            tl.from('.navbar-brand', {x: -50, opacity: 0})
            tl.from('.navbar-nav', {x: 50, opacity: 0}, "-=1")
        }
    }
}).mount('#app')