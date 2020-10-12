import os
import praw # $ pip install praw
from datetime import datetime # $ pip install DateTime
from dateutil import tz # $ pip install python-dateutil
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv # pip install python-dotenv
load_dotenv()


class Scrape:

    #Settings
    my_client_id = str(os.getenv("REDDIT_CLIENT_ID"))
    my_client_secret = str(os.getenv("REDDIT_CLIENT_SECRET"))
    my_user_agent = str(os.getenv("REDDIT_USER_AGENT"))

    def __init__(self, subreddit_name, months_old, post_count):
        self.SUBREDDIT_NAME = subreddit_name
        self.MONTH_NUM = months_old
        self.POST_COUNT = int(post_count)
        self.posts = [subreddit_name]
        self.configure_reddit()
        self.configure_datetime()

    def configure_reddit(self):
        # Initialise the reddit instance with correct information
        self.reddit = praw.Reddit(
            client_id=self.my_client_id,
            client_secret=self.my_client_secret,
            user_agent=self.my_user_agent
        )

    def configure_subreddit(self):
            subreddit = self.reddit.subreddit(self.SUBREDDIT_NAME)
            self.observe_posts = subreddit.new(limit=self.POST_COUNT)

    def sub_exists(self):
        exists = True
        try:
            self.reddit.subreddits.search_by_name(self.SUBREDDIT_NAME, exact=True)
        except:
            exists = False
        if(exists):
            self.configure_subreddit()
        return exists

    def configure_datetime(self):
        now = datetime.utcnow()
        local = tz.tzlocal()
        utc = tz.gettz('UTC')
        time_now = now.replace(tzinfo=utc).date()
        self.time_limit = time_now - relativedelta(months=self.MONTH_NUM)

    def get_data(self):
        for post in self.observe_posts:
             try:
                  post_utc = datetime.utcfromtimestamp(post.created_utc).date()
                  if(post_utc < self.time_limit):
                       #print("   Further posts are too old")
                       break
                  self.posts.append({'postTitle': post.title, 'author': post.author.name})
             except:
                  #print("   cant fetch data for post: " + post.title)
                  pass
        return self.posts