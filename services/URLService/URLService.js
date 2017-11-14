const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const URL = {

  //Accepts the classList database entry as its argument and returns a formatted classList (for use in runService)
  construct: (classList) => {

    //Constructing new class list
    let newClassList = []

    //Formatting the new classList entry
    classList.classIDs.forEach( (entry) => {
      newClassList.push(
        {
          classID: entry,
          url: null,
          phones: []
        }
      )
    })

    //Constructing url
    newClassList.forEach( (entry) => {

      let id = entry.classID

      //Extracting values from url concatenation
      let subject = id.slice(0, id.indexOf('.'))
      id = id.slice(id.indexOf('.')+1)

      let year = id.slice(0, id.indexOf('.'))
      id = id.slice(id.indexOf('.')+1)

      let season = id.slice(0, id.indexOf('.'))
      id = id.slice(id.indexOf('.')+1)

      let crn = id.slice(0, id.indexOf('.'))

      //Formatting season to fit url parameters
      switch(season) {
        case 'Fall':
          season = '07'
          break
        case 'Spring':
          season = '03'
          break
        case 'Summer':
          season = '05'
          break
      }

      url = `https://ssb.vcccd.edu/prod/pw_pub_sched.p_course_popup?vsub=${subject}&vterm=${year + season}&vcrn=${crn}`

      //Adding url to newClassList entry
      entry.url = url
    })

    return newClassList
  },

  //Returns true or false depending on waitlist availability
  checkWaitlist: (url) => {

    //Making request for page to parse
    let req = new XMLHttpRequest()
    req.open('GET', url, false)
    req.send(null)

    //Setting variable for response html text
    let resHTML = req.responseText

    //Finding waitlist slots in html response
    let waitlistSpots = resHTML.slice(resHTML.lastIndexOf('default3')+10, resHTML.lastIndexOf('default3')+11)

    //Creating boolean for waitlist availability
    let waitlistBoolean = false

    if(waitlistSpots) {
      //Returning true or false depending on the state of the waitlist
      waitlistBoolean = waitlistSpots >= '0' ? true : false
    }

    return waitlistBoolean

  }

}

module.exports = URL
