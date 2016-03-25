function changeDesc( value, desc ) {
   for (var i in projects) {
     if (projects[i].value == value) {
        projects[i].desc = desc;
        break; //Stop this loop, we found it!
     }
   }
}