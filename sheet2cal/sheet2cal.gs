function myFunction() {
 var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var start_date = new Date('November 27 2017')
    var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

  var start_date_1 = new Date (start_date.getTime() + MILLIS_PER_DAY)

  var date_str ="November 27 2017"
  var  time = "05:00"
  var combined = new Date (date_str + " " + time)

  // Maybe 'i' should be incrementing days not times?
  // 2 is the start index (0 index) of the day
  // 22 is the end time of the day
  
  
  for(var j = 0; j < 7; j++) {
      var day_counter = j;
      var long_event = ""
      var le_date_start_time = ""
          
    for( var i = 2; i < 39; i++){
      var curr_row = data[i]
      var start_time = curr_row[0]
      var end_time = curr_row[1]
      //Cycling through 7 days for a single row
      var event = curr_row[2 + j]
      // If something is left blank then continue
      if (event == "" && long_event == ""){ //EDGE CASE HERE if there are multiple events then a blank we will make the whole thing a block.
        continue
      }
      
      var date_start_time_tmp = new Date(date_str + " " + start_time)
      var date_end_time_tmp = new Date(date_str + " " + end_time)

      // Date_start_time needs to be icremented by 24 hours after every loop

      var date_start_time = new Date(date_start_time_tmp.getTime() + (MILLIS_PER_DAY*day_counter))
      var date_end_time = new Date(date_end_time_tmp.getTime() + (MILLIS_PER_DAY*day_counter))
      
      // This means we have a carry over event
      if(long_event != "") {
        if (long_event == event) { // if we have another carry over event
          continue; //do what we did before
        }
        if(event == ""){ // we want to make the old event (long_event) and continue
             var cal_event = CalendarApp.getDefaultCalendar().createEvent(long_event, le_date_start_time, date_start_time);
          //reset these params      
          long_event = ""
          le_date_start_time = ""
          continue;
        }
        else { //if there is a new event here (does not account for blank event)
          var cal_event = CalendarApp.getDefaultCalendar().createEvent(event, le_date_start_time, date_start_time);
          //reset these params      
          long_event = ""
          le_date_start_time = ""

        }
      }
      
      //Peak at next event with +1, does NOT COVER EDGE CASE OF i = 39
      
      //data[i+1] is the next row, j is the same b/c the day is the same
      // def have to refactor this to make more sense.
      if (data[i+1][2+j] == event){ // if the next event is the same
        long_event = event // keep track of this event name
        le_date_start_time = date_start_time // keep track of the start of this event
       continue; //don't make an event for this yet
      }
      
      //Make an event
       var cal_event = CalendarApp.getDefaultCalendar().createEvent(event, date_start_time, date_end_time);

      
      
      
      
    }
  }
  }
