// File with various and sundry mapping functions


function mapPitchTest(button) {
    var freq = button.location.x * 2.1828 + button.location.y / 1.618;
    return freq
}