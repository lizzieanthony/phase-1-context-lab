function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(employees) {
    return employees.map( employee => {
        return createEmployeeRecord(employee)
    })  
}

function createTimeInEvent(dateStamp) {
    //console.log(dateStamp)
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return this
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return this
}

function hoursWorkedOnDate(date) {
    let timeIn= this.timeInEvents.find(element => element.date === date).hour
    let timeOut= this.timeOutEvents.find(element => element.date === date).hour
    return (timeOut-timeIn)/100
}

function wagesEarnedOnDate(date){
     return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(scrArray, firstName){
    let employeeObj = scrArray.find(element => element.firstName === firstName)
    return employeeObj
}

// function calculatePayroll(array){ 
//     // console.log(allWagesFor)
//     let sum = 0
//     for (let i = 0; i < array.length; i++) {
//         sum += allWagesFor(array[i]);
//         //console.log(.array[i])
//       }
//       return sum
//     }
    
    function calculatePayroll(arrayOfObjects){
        let sum = 0;
        for(let employee of arrayOfObjects){
            sum += allWagesFor.call(employee);
        }
        return sum
    }