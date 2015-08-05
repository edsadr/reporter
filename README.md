#Reporter

A simple Bot listening for published links in channels and asking users for permission using *DM* to publish them in a bundled portal

##Installing

* Clone the repository
* Install Meteor by running: `curl https://install.meteor.com/ | sh` in Mac or Linux - For windows use this [installer](https://install.meteor.com/windows)
* Create a new Bot integration in Slack clicking [here](https://my.slack.com/services/new/bot)
* Configure the file *settings.sample.json* with your parameters and save it as *settings.json*
* Run the bot executing the command `meteor --settings settings.json` and test it in Slack
* Optional: deploy the bot to Meteor infrastructure running: `meteor yoursubdomain.meteor.com --settings settings.json`

##Todo

* Include commands to add links directly
* Add a command to set preferences about not sendings DM (don't bother me feature)
* Add infinite scrolling for Portal
* Add links categories by channel
* Add Slack user credit per link

## Credits
[Adrián Estrada](https://github.com/edsadr/)

##The MIT License

Copyright (c) 2015 Adrián Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

