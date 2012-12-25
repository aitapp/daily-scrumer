;(function ($) {
    var msg = {
        placeholder:{
            member_name:'member name'
        }
    };
    $.extend({

    });
    $.fn.extend({
        openUp:function(){
            var elm = $(this),
                height = elm.height();
            elm.height(0)
                .animate({
                    height:height
                });
        },
        memberListItem:function () {
            return $(this).each(function () {
                var li = $(this)
                    .addClass('positioned'),
                    data = li.data('data');
                $('<input/>')
                    .attr({
                        type:'text',
                        placeholder:msg.placeholder.member_name
                    })
                    .appendTo(li)
                    .val(data && data.name || '')
                    .editableText()
                    .change(function () {

                    });
                li.removableListItem(function(){
                    //TODO
                });
            });
        },
        memberSection:function () {
            var section = $(this),
                memberList = $('#mebmer-list', section);
            $('.member-list-item', memberList).memberListItem();

            $('#member-add-btn', section).click(function(){
                var btn = $(this);
                $('<li/>').insertBefore(btn)
                    .memberListItem()
                    .openUp();
            });
            return section;
        },

        sprintSection:function(){
            var section = $(this);

            return section;
        }
    });
    $(function () {
        $('#member-section').memberSection();

        $('#sprint-section').sprintSection();

        $('#head-nav').nav('setting');

    });
})(jQuery);