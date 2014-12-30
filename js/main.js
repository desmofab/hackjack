
        (function($){
            $.fn.disableSelection = function() {
                return this
                         .attr('unselectable', 'on')
                         .css('user-select', 'none')
                         .on('selectstart', false);
            };
        })(jQuery);


        $( document ).ready(function() {
			$("body").disableSelection();


			$(".card").draggable({
				zIndex: 100,
				revert:"invalid",
				opacity: 0.7,
				//appendTo: ".drop_card",
				helper: "clone",
				snap: true,
				start: function( event, ui ) {

					if( $("#remaining_cards").text() == "0" ){
						alert("Seleziona il numero di mazzi");
						return false;
					}
				}
				//snapTolerance: 30
				//snapMode: "inner"
				//grid: [ 80, 80 ]
			});


			$(".drop_card").droppable({
				accept: ".card",
				drop: function( event, ui ) {
				//var targetElem = $(this).attr("id");
				var carta = $( ui.draggable );
				var dropped = carta.clone().appendTo( this );
				$(dropped).find(".qty").remove();

				//Aggiungo 1 alla carta uscita
				carta_uscite(carta.find("a"));
				}
			});



			//Number of Decks choice
			$("#decks button").on("click", function(){
				$("#decks button").removeClass("active focus");
				$(this).addClass("active focus");
				$("#remaining_cards").text(52 * $(this).text());
			});


          //Remaining Cards
          //Running Count
          //TRUECOUNT
          // $(".card a").on("click",function(){
        carta_uscite = function(carta){

            var remaining = $("#remaining_cards").text();
            var running = $("#running_counts").text();
            var value = $(carta).data("val");
            var qty = $(carta).next().text();

            //QTY
            $(carta).next().text(Number(qty) + 1);

            //REMAINING
            $("#remaining_cards").text(remaining - 1);

            //RUNNING
            $("#running_counts").text(Number(running) + Number(value));

            //TRUECOUNT
            var decks_in_sabot = $("#remaining_cards").text() / 52;
            var truecount = $("#running_counts").text() / decks_in_sabot;
            $("#true_count").text( truecount.toFixed(2) );
          // });
		}

        }); 
