class TwoLineClockCard extends HTMLElement {

	  set hass(hass) {

		    if (!this.timeline) {
			      var config = this.config;
			      const card = document.createElement('HA-card');

			      this.style.textAlign = 'center';
			      this.style.display = 'inline-block';

			      card.style.paddingLeft = '0px';
			      card.style.paddingRight = '0px';
			      card.style.paddingTop = '8px';
			      card.style.paddingBottom = '8px';
            
            var time_font_size = config.time_font_size;
            if (time_font_size == undefined)
                time_font_size = '1rem';

            var date_font_size = config.date_font_size;
            if (date_font_size == undefined)
                date_font_size = '1rem';

			      this.timeline = document.createElement('div');
			      this.timeline.style.fontSize = time_font_size;
			      this.timeline.style.lineHeight = 'normal';

			      this.dateline = document.createElement('div');
			      this.dateline.style.fontSize = date_font_size;
			      this.dateline.style.lineHeight = 'normal';

			      card.appendChild(this.timeline);
			      card.appendChild(this.dateline);
			      this.appendChild(card);
			      var timeline = this.timeline;
			      var dateline = this.dateline;
			      display();
			      setInterval(display, 1000);
	          
			      function display() {
                var now = new Date();
                
                var timestr = now.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'});
                if (config.show_seconds)
                    timestr = now.toLocaleTimeString([], {hour:'numeric', minute:'2-digit',
                                                          second:'2-digit'});
                if (!config.show_am_pm)
                    timestr = timestr.replace(/[AP]M/i,"");
                else if (config.show_am_pm === "lower")
                    timestr = timestr.toLowerCase();

                timeline.innerHTML = timestr
                dateline.innerHTML = now.toLocaleDateString([], {weekday:'long', month:'long',
                                                                 day:'numeric'});
			      }
		    }
	  }

    setConfig(config) {
        this.config = config;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('two-line-clock-card', TwoLineClockCard);
