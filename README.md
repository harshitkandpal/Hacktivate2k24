# AI-PhishBot

## Tagline

Simulating sophisticated phishing attacks to enhance cybersecurity training and preparedness.

## The Problem it Solves

AI-PhishBot allows cybersecurity teams to conduct realistic phishing simulations, providing insights into potential vulnerabilities within an organization. By mimicking legitimate emails and launching sophisticated phishing campaigns, AI-PhishBot helps organizations train employees to recognize and respond to phishing attempts, ultimately improving overall security posture.

## Key Features

1. **Reconnaissance**: Gathers information to tailor phishing attacks.
2. **Profiling**: Creates detailed profiles of targets to enhance the realism of phishing attempts.
3. **Phishing Email Generation**: Crafts convincing phishing emails that mimic legitimate communication.
4. **Communication with Bots**: Manages interactions with targets and adjusts tactics based on responses.
5. **Success Metrics**: Measures the effectiveness of the campaign to identify areas for improvement.

## How to Use

1. **Setup**: Clone the repository and install necessary dependencies.
    ```shn pm install

    ```

2. **Dashboard Login**: Access the dashboard to view and manage campaigns. The login screen will appear as shown below:

   ![Login Screen](images/IMAGE1.jpg)

2. **Signup Page**: IF you have not created an account, then move to the signup page page to create an account
   [Signup Screen](images/IMAGE2.jpg)
   
4. **Dashboard Login**: Access the dashboard to view and manage campaigns.
   [Dashboard Screen](images/IMAGE3.jpg)    
    
6. **Create New Campaign**: Go to the 'New Campaigns' section and input the target domain name. A dropdown of campaigns sorted by date will be displayed.

   ![New Campaign](images/IMAGE4.jpg)

7. **View Campaigns**: Navigate to 'View Campaigns' to see the list of existing campaigns sorted by date.

   ![View Campaigns](images/IMAGE5.jpg)

8. **Information Gathering**: Enter the target domain name to automatically gather active email addresses using tools like Google Dorking, Crawling Websites, Hunter.io, and APIs. Alternatively, upload a CSV file with email addresses.

9. **Email Verification**: Verify the gathered email addresses to ensure they are active. The verified list will be saved in the database.

10. **Profiling**: Select an email address from the list to gather detailed information using automated and manual profiling techniques.

11. **Phishing Email Generation**: Use the AI bot to generate and send phishing emails that mimic legitimate communication styles.

12. **Phishing Campaign Execution**: Track and document the success of the phishing campaign using metrics like email open rates and click rates.

13. **AI Bot Communication**: Develop bots to respond to phishing emails and refine the campaign based on their responses.

## Deliverables

- **Reconnaissance Report**: Detailed report on the tools and methods used for reconnaissance and a list of active email addresses.
- **Profiling Report**: Comprehensive profiles for each of the active email addresses.
- **Phishing Email Samples**: Samples of generated phishing emails.
- **Campaign Performance Metrics**: Report on the phishing campaign's performance metrics.
- **Bot Responses**: Samples of responses from the bots.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For more information, please contact [yourname@yourdomain.com](mailto:yourname@yourdomain.com).

