const { createApp } = Vue

createApp({
    data() {
        return {
            loading:        true,
            events:         [],
            selectedEvent:  undefined,
            eventId:        new URLSearchParams(location.search).get("id"),
            bgGradient:     '',
        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(data => {
                this.events = data.events
                this.selectedEvent = this.events.find(event => event._id == this.eventId)
            })
            .catch(err => console.log(err))
            .finally(() => {
                this.loading    = false
                this.bgGradient = 'bg-grey-gradient'
            })
    }
}).mount('#app')