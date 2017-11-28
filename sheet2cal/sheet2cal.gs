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
  for( var i = 2; i < 39; i++) {
    var curr_row = data[i]
    var start_time = curr_row[0]
    var end_time = curr_row[1]

    
    for(var j = 0; j < 7; j++){
      var day_counter = j;

      //Cycling through 7 days for a single row
      var event = curr_row[2 + j]
      // If something is left blank then continue
      if (event == ""){
        continue
      }
      
    var date_start_time_tmp = new Date(date_str + " " + start_time)
    var date_end_time_tmp = new Date(date_str + " " + end_time)

     // Date_start_time needs to be icremented by 24 hours after every loop

    var date_start_time = new Date(date_start_time_tmp.getTime() + (MILLIS_PER_DAY*day_counter))
    var date_end_time = new Date(date_end_time_tmp.getTime() + (MILLIS_PER_DAY*day_counter))
    
    var cal_event = CalendarApp.getDefaultCalendar().createEvent(event, date_start_time, date_end_time);


    }
    
    
    //Another loop here to loop through the events for a certain calendar time
    // This 2nd loop ensures that we loop through the entire week.
    //TODO: Need to somehow detect and combine if an event is blank, then use last or dup

    
  } 
}

