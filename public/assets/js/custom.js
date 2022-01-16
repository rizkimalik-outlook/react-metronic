function onSelectPicker(value) {
    if (value === undefined) {
        $('.selectpicker').selectpicker('render');
    }
    else {
        $('.selectpicker').val(value);
        $('.selectpicker').selectpicker('refresh');
    }
}