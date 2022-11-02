const $menu = $('.option ul li ul')
const onMouseUp = (e) => {
  if (
    !$menu.is(e.target) && // If the target of the click isn't the container...
    $menu.has(e.target).length === 0
  ) {
    // ... or a descendant of the container.
    $('.option ul li ul').removeClass('optionSetting')
  }
}
$(document).ready(function () {
  // // xử lí option
  // $('.option-click').click(function (e) {
  //   $(this)
  //     .find('ul.menu')
  //     .toggleClass('optionSetting')
  //     .promise()
  //     .done(() => {
  //       if ($(this).find('ul.menu').hasClass('optionSetting')) {
  //         $(document).on('mouseup', onMouseUp) // Only listen for mouseup when menu is ...
  //       } else {
  //         $(document).off('mouseup', onMouseUp) // else remove listener.
  //       }
  //     })
  // })
  // // xử lí message click
  // $('.groups .item').click(function (e) {
  //   $('.chat-introduction').addClass('hide')
  //   $('.chat').addClass('show')
  //   console.log($(this).find('p.friends').text())
  //   $('.friends-message').html($(this).find('p.friends').text())
  //   if ($(window).width() <= 800) {
  //     $('.toolbar').addClass('hide')
  //     // $('.chat').addClass('show')
  //   }
  // })
  // //  nav
  // $('.header-nav ul li').click(function (e) {
  //   $('.header-nav ul li').removeClass('active')
  //   $(this).addClass('active')
  // })
  // responsive pc
  $(window).on('resize', function (event) {
    if ($(this).width() > 800) {
      $('.toolbar').removeClass('hide')
      if ($('.chat-introduction').hasClass('hide')) {
        $('.chat').addClass('show')
      }
    } else {
      if ($('.toolbar').hasClass('hide')) $('.chat').addClass('show')
    }
  })
  // xử lí click chát
  $('.click-chat').click(function (e) {
    if ($(window).width() <= 800) {
      $('.toolbar').removeClass('hide')
      $('.chat').removeClass('show')
    }
  })
})
