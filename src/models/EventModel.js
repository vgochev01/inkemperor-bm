class EventModel {
  constructor(apiEvent) {
      this.title = `${apiEvent.client.name} - ${apiEvent.sessionLength}hr session`;
      this.start = new Date(apiEvent.from);
      this.end = new Date(apiEvent.to);
      this.allDay = apiEvent.allDay;
      this.backgroundColor = apiEvent.tattooArtist.color; // For FullCalendar
      this.borderColor = apiEvent.tattooArtist.color; // To match border with background
      this.tattooArtist = apiEvent.tattooArtist;
      this.clientInfo = apiEvent.client;
      this.additionalInfo = apiEvent.additionalInfo;
      this.deposit = apiEvent.deposit;
      this.revenue = apiEvent.revenue;
      this.paymentMethod = apiEvent.paymentMethod;
      this.sessionLength = apiEvent.sessionLength;
      this.recurring = apiEvent.recurring;
      this.photo = apiEvent.photo;
      this._id = apiEvent._id;
      this.apiEvent = apiEvent;
  }
}

export default EventModel;
