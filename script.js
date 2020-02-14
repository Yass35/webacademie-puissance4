(function($) {
    $.fn.puissance4 = function(cell_x,col_y)
    {

        // class Joueur {
        //     constructor(id,color){
        //         this.id = id;
        //         this.color = color;
        //     }
        // }
        // const Player_1 = new Joueur(1,"red");
        // const Player_2 = new Joueur(2,"yellow");
        var total_de_tour = cell_x * col_y

        var Nbr_de_tour = 0;
        var Score_Player_1 = 0;
        var Score_Player_2 = 0;
        //Création d'un tableau vide avec le nombre de case totale
        var myArray = new Array();
        for(let i4 = 0; i4 < col_y; i4++ ){
            myArray[i4] = [];
        }


        //Création des div
        for(let i = 0; i < col_y ; i++){
            let currentDiv1 = document.getElementById("grid");
            let newDiv1 = document.createElement("div");
            newDiv1.setAttribute("class",'col');
            currentDiv1.appendChild(newDiv1);
            for(let i2 = 0; i2 < cell_x ; i2++){
                let newDiv2 = document.createElement("div");
                newDiv2.setAttribute("class", 'cell');
                newDiv1.appendChild(newDiv2);
            }
        }
        $('#currentPlayer').text('Player 1 can start!').css({"background-color":"#fbe739","opacity":"1"});

        $( "#cancel" ).click(function(){
            delete myArray[y][x]
            $(infocell).css({"background-color":"#efefef","box-shadow": "inset 10px -5px 0px 3px"});
            Nbr_de_tour--
            $('#cancel').css({"opacity":"0.4","pointer-events": "none"});
            if(Nbr_de_tour%2 == 0)
            {
                $('#currentPlayer').text('Player 1, play again! ').css({"background-color":"#fbe739"});
            }
            else
            {
                $('#currentPlayer').text('Player 2, play again!').css({"background-color":"#fb3939"});
            }
        });

        $( "#replay" ).click(function() {
            $('.cell').css({"background-color":"#efefef","box-shadow": "inset 10px -5px 0px 3px"});
            $('#grid').css({"pointer-events": "initial","opacity": "1"});
            $('#cancel').css({"opacity":"0.4","pointer-events": "none"});
            $('#currentPlayer').text('Player 1 can start!').css({"background-color":"#fbe739","animation":"none"});
            $('.AnimVictoire').css({"display":"none"});
            $('#replay').css({"opacity":"0.4","pointer-events": "none"});
            myArray = [];
            for(let i4 = 0; i4 < col_y; i4++ ){
                myArray[i4] = [];
            }
            Nbr_de_tour = 0
        });

        function verif(Array_verif){
            Array_verif.forEach(element => {
                let join = element.join(',');
                if(join.includes("1,1,1,1") === true)
                {
                    $('#currentPlayer').text('Well done, Player 1 won!').css({"background-color":"#fbe739","animation": "crescendo 1.5s alternate infinite ease-in"});
                    $('#grid').css({"pointer-events": "none","opacity": "0.3","transition-duration":"0.7s"});
                    $('#cancel').css({"opacity":"0.4","pointer-events": "none"});
                    $('#reset').css({"opacity":"1","pointer-events": "initial"});
                    $('#playerOne').text(++Score_Player_1);
                    $('.AnimVictoire').css({"display":"block"});
                }
                else if(join.includes("2,2,2,2") === true)
                {
                    $('#currentPlayer').text('Well done, Player 2 won!').css({"background-color":"#fb3939","animation": "crescendo 1.5s alternate infinite ease-in"});
                    $('#grid').css({"pointer-events": "none","opacity": "0.3","transition-duration":"0.7s"});
                    $('#cancel').css({"opacity":"0.4","pointer-events": "none"});
                    $('#playerTwo').text(++Score_Player_2);
                    $('.AnimVictoire').css({"display":"block"});
                    $('#reset').css({"opacity":"1","pointer-events": "initial"});
                }
                else if(Nbr_de_tour === total_de_tour){
                    $('#currentPlayer').text('Game over, try again!').css({"background-color":"#cbcbcb"});
                    $('#grid').css({"pointer-events": "none","opacity": "0.3","transition-duration":"0.7s"});
                    $('#cancel').css({"opacity":"0.4","pointer-events": "none"});
                    $('#reset').css({"opacity":"1","pointer-events": "initial"});
                }
            });
        }

        console.log('nbr de tour : ',Nbr_de_tour)
        console.log("totale de tour = ",total_de_tour)



        $( ".col" ).click(function() {
            $('#cancel').css({"opacity":"1","pointer-events": "initial"});
            $('#replay').css({"opacity":"1","pointer-events": "initial"});
            y = $(this).index();
            let cells = $(this).find('.cell').get().reverse();

            for(let [index, cell] of cells.entries()){

                x = index;
                if((x in myArray[y]) === false){

                console.log('x et y',x,y);
                console.log('Colonne ',myArray);
                    Nbr_de_tour++;
                    if(Nbr_de_tour%2 == 0)
                    {
                        $(cell).css({"background-color":"#fb3939","box-shadow": "inset 3px -1px 9px"});
                        $('#currentPlayer').text('Player 1 yours to play!').css({"background-color":"#fbe739"});
                        myArray[y][x]='2';
                    }
                    else
                    {
                        $(cell).css({"background-color":"#fbe739","box-shadow": "inset 3px -1px 9px"});
                        $('#currentPlayer').text('Player 2 yours to play!').css({"background-color":"#fb3939"});
                        myArray[y][x]='1';
                    }

                    infocell = cell;

                    console.log('y et x',y,x)
                    break;

                }

            }




            let stockage_par_ligne = new Array()
            for(let i6 = 0 ; i6 < cell_x ; i6++){
                let array = new Array();
                for(let i7 = 0 ; i7 < col_y ; i7++){
                    array.push(myArray[i7][i6])
                }
                // console.log("array avant join : ",array)
                stockage_par_ligne.push(array)
            }
            // console.log('stockage finale ',stockage_par_ligne)


        ////////////////////////////////////////////////////////////////////////////

            let stockage_par_diagonale_droite = []
            for(let etape_en_y = 0 ; etape_en_y <= cell_x  ; etape_en_y++){
                let array2 = new Array();
                let test = etape_en_y
                for(let i6 = 0 ; test <= cell_x ; i6++){
                    if(i6 == cell_x ){
                        break
                    }
                    else if(i6 <= cell_x ){
                        let case1 = myArray[test++].slice(i6,i6 + 1);
                        array2.push(case1)
                    }
                }

                stockage_par_diagonale_droite.push(array2)
            }

            for(let etape_en_x = 1 ; etape_en_x <= cell_x ; etape_en_x++){
                let array3 = new Array();
                let depart_en_y = 0
                for(let i6 = etape_en_x ; depart_en_y <= cell_x; i6++){
                    if(i6 == cell_x  ){
                        break
                    }
                    else if(i6 <= cell_x  ){
                        let case2 = myArray[depart_en_y++].slice(i6,i6 + 1);
                        array3.push(case2)
                    }
                }
                stockage_par_diagonale_droite.push(array3)
            }

        ////////////////////////////////////////////////////////////////////////////

            let stockage_par_diagonale_gauche = []
            for(let etape_en_y2 = cell_x ; etape_en_y2 >= 0  ; etape_en_y2--){
                let array4 = new Array();
                let test1 = etape_en_y2
                for(let i6 = 0 ; test1 <= cell_x ; i6++){
                    if(test1 < 0 ){
                        break
                    }
                    else if(test1 <= cell_x ){
                        let case5 = myArray[test1--].slice(i6,i6 + 1);
                        array4.push(case5)
                    }
                }
                stockage_par_diagonale_gauche.push(array4)
            }

            for(let etape_en_x = 1 ; etape_en_x <= cell_x ; etape_en_x++){
                let array5 = new Array();
                let depart_en_y = cell_x
                for(let i6 = etape_en_x ; depart_en_y <= cell_x; i6++){
                    if(i6 == cell_x  ){
                        break
                    }
                    else if(i6 <= cell_x  ){
                        let case2 = myArray[depart_en_y--].slice(i6,i6 + 1);
                        array5.push(case2)
                    }
                }
                stockage_par_diagonale_gauche.push(array5)
            }

        ////////////////////////////////////////////////////////////////////////////

            verif(myArray)
            verif(stockage_par_ligne)
            verif(stockage_par_diagonale_droite)
            verif(stockage_par_diagonale_gauche)
        });
    };
})(jQuery);