class BananaBudgetService {

	constructor(start) {
		this.startDate = new Date(start);
	}

	getBudgetForDays(days) {
		let total = 0;

		for (let i = 0; i < days; i++) {
			if (this.isWeekDay())
				total += this.getPriceForDayOfMonth();
			this.incrementDays();
		}

		return `$${total.toFixed(2)}`;
	}

	incrementDays() {
		this.startDate.setDate(this.startDate.getDate() + 1);
	}

	isWeekDay() {
		const dayOfWeek = this.startDate.getDay();
		return dayOfWeek !== 0 && dayOfWeek !== 6;
	}

	getPriceForDayOfMonth() {
		const weeksToPrice = {
			1: 0.05,
			2: 0.10,
			3: 0.15,
			4: 0.20,
			5: 0.25
		};

		return weeksToPrice[Math.ceil(this.startDate.getDate() / 7)];
	}
}

module.exports = BananaBudgetService;
