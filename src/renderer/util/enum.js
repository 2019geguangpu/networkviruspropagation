export const EState = {
    INFECTED: 1,
    SUSCEPTIBLE: 2,
    IMMUNTE: 3,
    LATENT: 4,
    EXPLOSIVE: 5,
    DISCONNECT: 6,
}

export const EEvent = {
    DIALOG_VISIBLE: 'dialog_visible',
    SET_CHART_DATA: 'set_chart_data',
}

export const ECommand = {
    START: 'start',
    STOP: 'stop',
    NO_COMMAND: 'no_command'
}