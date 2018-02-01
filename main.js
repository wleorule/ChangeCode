function Registracija() {
    var naziv = $("input[name=nazivTima]").val();
    var zaporka = $("input[name=zaporkaTima]").val();

    var c1I = $("input[name=clan1Ime]").val();
    var c1P = $("input[name=clan1Pime]").val();
    var c1E = $("input[name=clan1Email]").val();

    var c2I = $("input[name=clan2Ime]").val();
    var c2P = $("input[name=clan2Pime]").val();
    var c2E = $("input[name=clan2Email]").val();

    var c3I = $("input[name=clan3Ime]").val();
    var c3P = $("input[name=clan3Pime]").val();
    var c3E = $("input[name=clan3Email]").val();

    var c4I = $("input[name=clan4Ime]").val();
    var c4P = $("input[name=clan4Pime]").val();
    var c4E = $("input[name=clan4Email]").val();

    if(naziv == "" || zaporka == "" || c1I == "" || c2I == "" || c3I == "" || c4I == "" ||  c1P == "" ||  c2P == "" ||  c3P == "" ||  c4P == "" ||  c1E == "" ||  c2E == "" ||  c3E == "" ||  c4E == "") {
        $("#error").html("Molimo vas popunite sva polja!");
    }
    else {
        $.ajax({
            url: "http://52.233.158.172/change/api/en/account/register",
            type: "post",
            beforeSend: function(request) {
               // request.setRequestHeader("Access-Control-Request-Method", "POST");
               // request.setRequestHeader("Access-Control-Request-Headers", "X-Custom-Header");
               // request.setRequestHeader("Access-Control-Allow-Origin", "*");
                //console.log(1);
            },
            data: { "Teamname":naziv, "Password":zaporka, "members": [
            {
                "name": c1I, "surname": c1P, "mail": c1E
            },
            {
                "name": c2I, "surname": c2P, "mail": c2E
            },
            {
                "name": c3I, "surname": c3P, "mail": c3E
            },
            {
                "name": c4I, "surname": c4P, "mail": c4E
            }
        ]},
        //headers: { "Access-Control-Allow-Headers": "X-Custom-Header","Access-Control-Allow-Origin": "*" },
        dataType: "json",
        //crossDomain: true,
        error: function(error) {
            console.log("Error: ");
            console.log(error);
        },
        success: function (data){

            console.log(data);

        }});
    }

}

function Prijava(){
    var naziv = $("input[name=nazivTima]").val();
    var zaporka = $("input[name=zaporkaTima]").val();

    if(naziv == "" || zaporka == "") {
        $("#error").html("Molimo vas popunite sva polja!");
    }
    else{
        $.ajax({
            url: "http://52.233.158.172/change/api/en/account/login",
            type: "post",            
            data: { "Teamname":naziv, "Password":zaporka },       
        dataType: "json",
        error: function(error) {
            console.log("Error: ");
            console.log(error);
        },
        success: function (data){
            console.log(data);
            var json = jQuery.parseJSON(data.Result);
            $("#success").html("ID: " + json.TeamId + "<br>Token: " + json.AuthorizationToken);

        }});
    }
}

function DohvatiPodatke() {
    $.ajax({
        url: "http://52.233.158.172/change/api/hr/team/details/5",
        type: 'get',        
        beforeSend: function(request) { 
            request.setRequestHeader("Access-Control-Request-Headers", "authorization");
            request.setRequestHeader("X-Authorization", "U2lyb3RpbGphX1ZhbGxleTo6"); 
        },
        error: function(error) {
            console.log("Error: ");
            console.log(error);
        },
        success: function (data){
            var json = jQuery.parseJSON(data.Result);
            console.log(json);
            $("input[name=nazivTima]").val(json.TeamName);
            $("input[name=zaporkaTima]").val(json.Password);
            $("input[name=idTima]").val(json.Id);

            var index = 1;
            var clanovi = json.Members;
          
            $.each(clanovi,function(a, element ) {
                
                $("#popuni").append(
                    '<h3 class="shadow">Član '+index+'</h3><hr class="short"><div class="form-row"><div class="form-label">Ime:</div><div class="form-input">' + 
                    '<input type="text" placeholder="Ime" name="clan3Ime" value="'+element.Name+'" /></div></div><div class="form-row"><div class="form-label">' +
                    'Prezime:</div><div class="form-input"><input type="text" placeholder="PrezIme" name="clan3Pime" value="'+element.Surname+'"/>' +
                    '</div></div><div class="form-row"><div class="form-label">Email:</div><div class="form-input"><input type="email" placeholder="Email" name="clan3Email" value="'+element.Mail+'"/></div></div>'
                );
                index++;
            });

            
        }});
}