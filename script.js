const MONTHS=["JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEP","OCT","NOV","DEC"];
const Month={
    JAN:0,
    FEB:1,
    MAR:2,
    APR:3,
    MAY:4,
    JUN:5,
    JULY:6,
    AUG:7,
    SEP:8,
    OCT:9,
    NOV:10,
    DEC:11
}
const LOCATION={
    INDIA:0,
    DALLAS:1
}
const HOLIDAYS=[
    {
        title:"New Year's Day",
        Location:[LOCATION.INDIA,LOCATION.DALLAS],
        Day:1,
        Month:Month.JAN
    },
   
    {
        title:"Memorial Day",
        Location:[LOCATION.DALLAS],
        Day:31,
        Month:Month.MAY
    },
    {
        title:"Independence Day",
        Location:[LOCATION.DALLAS],
        Day:5,
        Month:Month.JLY
    },
    {
        title:"Labor Day",
        Location:[LOCATION.DALLAS],
        Day:6,
        Month:Month.SEP
    },
    {
        title:"Thanksgiving",
        Location:[LOCATION.DALLAS],
        Day:25,
        Month:Month.NOV
    },
    {
        title:"thanksgiving",
        Location:[LOCATION.DALLAS],
        Day:26,
        Month:Month.NOV
    },
    {
        title:"Republic Day",
        Location:[LOCATION.INDIA],
        Day:26,
        Month:Month.JAN
    },
    {
        title:"Holi",
        Location:[LOCATION.INDIA],
        Day:29,
        Month:Month.MAR
    },
    {
        title:"Good Friday",
        Location:[LOCATION.INDIA,LOCATION.DALLAS],
        Day:2,
        Month:Month.APR
    },
    {
        title:"Ramzan/ Eid-ul-Fitr",
        Location:[LOCATION.INDIA],
        Day:13,
        Month:Month.MAY
    },
    {
        title:"Janmashtami",
        Location:[LOCATION.INDIA],
        Day:30,
        Month:Month.AUG
    },
    {
        title:"Dussehra",
        Location:[LOCATION.INDIA],
        Day:15,
        Month:Month.OCT
    },
    {
        title:"Diwali",
        Location:[LOCATION.INDIA],
        Day:4,
        Month:Month.NOV
    },
    {
        title:"Diwali",
        Location:[LOCATION.INDIA],
        Day:5,
        Month:Month.NOV
    },
    {
        title:"Christmas (observed)",
        Location:[LOCATION.INDIA,LOCATION.DALLAS],
        Day:27,
        Month:Month.DEC
    }
    ,
    {
        title:"Christmas Eve",
        Location:[LOCATION.DALLAS],
        Day:24,
        Month:Month.DEC
    }
]
const DAYOFMONTH=["SAT","SUN","MON","TUE","WED","THU","FRI"]
const START_YEAR=1994;
var EventCalender=
{
   
    Init(){

        //current date
        document.getElementById("curr_date").innerHTML = "Today's date: " + new Date().toLocaleDateString();

        // localStorage variable used to store information.(konsa month store kiya tha)
        //in this variable its value is retained.
        if(localStorage.getItem("selectedMonthId")==null)
        {
            //agar koi month sel nai kia to show krdo all months
            document.getElementById('divEventViewer').innerHTML=this.GetMonthsHtml();
        }
        else{
            //otherwise show krdo selected month.
            document.getElementById('divEventViewer').innerHTML=this.GetMonthHtml();
        }
    },
    // jaise hee for e.g mene jan par click kra to ye function call hogya.
    selectMonth(monthId){
        var year=document.getElementById("selectYears").value;
        localStorage.setItem("selectedMonthId", monthId);
        localStorage.setItem("selectedYear", year);
        // ab jab init call hoga to else wala chale ga (coz this time we selected a month.)
        this.Init();    
    },
    //local storage ko hamne remove kr diya ab phir init null wale case ko hee call krega.
    Reset(){
        localStorage.removeItem("selectedMonthId");
        localStorage.removeItem("selectedYear");
        this.Init()
    },

    BindMonth(){
        document.getElementById('divEventViewer').innerHTML=GetMonthHtml();
    },
    LoadHolidays(holiday){
        var response=''
        if(holiday!=undefined)
        for(var holidayLocationindex=0;holidayLocationindex<holiday.Location.length;holidayLocationindex++){
            var checkIfHolidayIndian=holiday.Location[holidayLocationindex]==LOCATION.INDIA;
            var holidayClass=checkIfHolidayIndian?'indian-holiday':'dallas-holiday';
            response+='<div class="calender-holiday my-1 text-center '+holidayClass+'">'+holiday.title+'</div>'
        }
        console.log(response)
        return response
    },
    GetMonthHtml(){
        var monthHtml='';
        var month=localStorage.getItem("selectedMonthId");
        var year=localStorage.getItem("selectedYear");

        var currentMonth=new Date('2021',month,0)
        monthHtml+='<div class="row"    >\
                        <div class="my-3 container" style="color:peach;font-size:20px">\
                            Month:'+MONTHS[month]+'\
                            Year:'+year+'\
                        </div>\
                        <div class="events-on-date">\
                        </div>\
                        <div class="col-md-12 my-3" style="color:white">\
                            <div class="row text-center">'
                            //yaha sat .. .. . .. .. . Fri
                                for(var day=0;day<DAYOFMONTH.length;day++){
                                    monthHtml+='<div class="col-md-1 calender-day-cell-heading">'+DAYOFMONTH[day]+'</div> '
                                }
                                monthHtml+='\
                            </div>\
                        </div>'
                        // niche 1 2 3 4 5....
        monthHtml+='<div class="col-md-12">'
        // niche Last Date(e.g 31 ,30 ,28) of a month
        // new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, dayOfDate).getDate()
         for(var dayOfDate=1;dayOfDate<=new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, dayOfDate).getDate();){
             monthHtml+='<div class="row">'
             //niche wala sat ..   fri
            for(var day=0;day<DAYOFMONTH.length;day++)
            {
                //mon ==mon then print else empty (ek tarah see hame pichle month ke din nai krvaye ge print)
                 if(day==new Date(year,month,dayOfDate).getDay()){
                    var holiday=HOLIDAYS.find(e=>e.Day==dayOfDate&&e.Month==month);

                    monthHtml+='<div class="col-md-1 calender-day-cell">'+dayOfDate+'\
                    '+this.LoadHolidays(holiday)+'\
                    </div> ';
                    dayOfDate++;
                    if(dayOfDate>new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, dayOfDate).getDate()){
                        break;
                    }
                 }
                 else{
                    monthHtml+="<div class='col-md-1 calender-day-cell'></div>";
                 }
            }

            monthHtml+='</div> '          
        }
        monthHtml+='</div> '
        monthHtml+='<div class="row">\
        <div class="col-md-12">\
        <span class="legend-row"><span class="legend indian-holiday"></span><span class="legend-text"> Delhi.</span></span>\
        <span class="legend-row"><span class="legend dallas-holiday"></span><span class="legend-text"> Dallas.</span></span>\
        <button type="button" onclick="EventCalender.Reset()" class="btn btn-danger text-light " style="border-radius:5px;width:max-content;">Go Back</button>\
       </div>\
    </div>';
        return monthHtml;
    },
    GetMonthsHtml(){
        var monthListHtml='';//html generate krta hh ye jo ham div mein add krte hh
//yaha bootstrap bhi use kra hh to make it responsive.
        for(var month=0;month<MONTHS.length;month++){
            monthListHtml+="<div class='col-lg-4 col-md-4 col-sm-6 col-xm-6 calender-cell' \
            onclick='EventCalender.selectMonth("+month+")'>\
                "+MONTHS[month]+"\
            </div>"
        }
        var monthsHtml="<div>\
            <div class='row'>\
            </div>\
            <div class='row padding-bottom'>\
                <div class='col-sm-3 col-xs-12' style='font-size:2em'>\
                    Select Year: \
                    <select name='years' class='form-control my-3' id='selectYears'>\
                    "+EventCalender.BindYears()+"\
                    </select>\
                </div>\
            </div>\
            <div class='row calender text-center my-3'>"
                +monthListHtml+
            "</div>\
        </div>";
        return monthsHtml;
    },
    // adding items to drop down baki drop down hamne phele hee bna liya tha using select.
    BindYears(){
        var yearHtml=''
        for(var year=new Date().getFullYear();year>=START_YEAR;year--){
            yearHtml+='<option value="'+year+'">'+year+'</option>';            
        }
        return yearHtml;
    }
   
}
