/**
 * params: 
 * - start: string (format: MM/DD/YYYY) 
 * - days: number
 * - output: budget: string (format: $0.00)
 */
function calculateBananaBudget(start, days) {
    const dateParams = start.split('/');
  
    let year = parseInt(dateParams[2], 10); 
    let month = parseInt(dateParams[0], 10);
    let day = parseInt(dateParams[1], 10);
  
    let daysInMonth = getDaysInMonth(year, month);
    let startDay = getStartDayOfWeek(year, month, day);
  
    let sum = 0;
  
    for (let i = 0; i < days; i++) {
      if (startDay > 0 && startDay < 6) {
        sum += getPriceForDayOfMonth(day);
      }
  
      startDay = startDay === 6 ? 0 : startDay + 1;
  
      if (day === daysInMonth) {
        day = 1;
        
        if (month === 12) {
          month = 1;
          year++;
        } else {
          month++;
        }
  
        daysInMonth = getDaysInMonth(year, month);
      } else {
        day++;
      }
    }
  
    return sum.toFixed(2);
  }
  
  function getDaysInMonth(year, month) { 
    return new Date(year, month, 0).getDate();
  };
  
  function getStartDayOfWeek(year, month, day) {
    const monthIndex = month - 1;
    return new Date(year, monthIndex, day).getDay()
  }
  
  function getPriceForDayOfMonth(day) {
    const weeksToPrice = {
      1: 0.05,
      2: 0.10,
      3: 0.15,
      4: 0.20,
      5: 0.25
    }
  
    return weeksToPrice[Math.ceil(day / 7)];
  }
  
  module.exports = calculateBananaBudget;
  