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
    ```sh
    git clone https://github.com/yourusername/ai-phishbot.git
    cd ai-phishbot
    pip install -r requirements.txt
    ```

2. **Dashboard Login**: Access the dashboard to view and manage campaigns. The login screen will appear as shown below:

   ![Login Screen](images/image1.png)

3. **Create New Campaign**: Go to the 'New Campaigns' section and input the target domain name. A dropdown of campaigns sorted by date will be displayed.

   ![New Campaign](path_to_new_campaign_image.png)

4. **View Campaigns**: Navigate to 'View Campaigns' to see the list of existing campaigns sorted by date.

   ![View Campaigns](path_to_view_campaigns_image.png)

5. **Information Gathering**: Enter the target domain name to automatically gather active email addresses using tools like Google Dorking, Crawling Websites, Hunter.io, and APIs. Alternatively, upload a CSV file with email addresses.

6. **Email Verification**: Verify the gathered email addresses to ensure they are active. The verified list will be saved in the database.

7. **Profiling**: Select an email address from the list to gather detailed information using automated and manual profiling techniques.

8. **Phishing Email Generation**: Use the AI bot to generate and send phishing emails that mimic legitimate communication styles.

9. **Phishing Campaign Execution**: Track and document the success of the phishing campaign using metrics like email open rates and click rates.

10. **AI Bot Communication**: Develop bots to respond to phishing emails and refine the campaign based on their responses.

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

## General Instructions

1. **Confidentiality**: Do not share the problem statement until the hackathon concludes.
2. **Original Work**: All submissions must be original work. Disclose any third-party code used.
3. **Code of Conduct**: Adhere to the hackathon's code of conduct.
4. **Submission Guidelines**: Submit entries through the designated platform by the deadline.
5. **Prohibited Activities**: No cheating, plagiarism, or tampering with other teams' projects.
6. **Intellectual Property**: Teams retain ownership of their projects, but organizers can showcase them.
7. **Technical Support**: Available through Discord and email.
8. **Demo Requirements**: Present a demo highlighting main features and functionality.
9. **Documentation**: Provide documentation, including a README file, setup instructions, and user guides.
10. **Ethical Considerations**: Projects must not promote harmful behavior.
11. **Withdrawal**: Notify organizers if withdrawing from the
