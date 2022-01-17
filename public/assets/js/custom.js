function onSelectPicker(value) {
    if (value === undefined) {
        $('.selectpicker').selectpicker('render');
    }
    else {
        $('.selectpicker').val(value);
        $('.selectpicker').selectpicker('refresh');
    }
}

function onSelectPickerChannel(value) {
    console.log('chnel')
    $('.selectpicker_channel').val(value);
    $('.selectpicker_channel').selectpicker('refresh');
}