export const environment = {
    production: false,
    apiUrl: 'http://mitchell-rms-1500652919.us-west-1.elb.amazonaws.com/',
    appUrl: 'localhost:4200', // TODO update once static site is configured
    serviceContext: {
        resource: 'rms-resource',
        reservation: 'rms-reservation',
        adminLogin: 'admin-login',
        adminRegistration: 'admin-registration'

    },
    slackClientId: '564170628241.621662389317',
};
