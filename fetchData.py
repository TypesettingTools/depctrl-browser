import json
import requests
import pathlib

feedQueue = [('DependencyControl', 'https://raw.githubusercontent.com/TypesettingTools/DependencyControl/master/DependencyControl.json')]
procesesed = []

def main():
    pathlib.Path("./_data/feeds/").mkdir(parents=True, exist_ok=True)
    while feedQueue:
        feed = feedQueue.pop(0)
        processFeed(*feed)



def processFeed(feedName, feedURL):
    if feedName in procesesed:
        return

    r = requests.get(feedURL)
    print(feedURL)
    feedString = r.text
    # r.json() Doesn't work due to invalid json
    import re
    feedString = re.sub(",[ \t\r\n]+}", "}", feedString)
    feedString = re.sub(",[ \t\r\n]+\]", "]", feedString)
    feedString = feedString.encode().decode('utf-8-sig')
    try:
        feedJson = json.loads(feedString)
    except:
        print(f'json feed {feedName} invalid: {feedURL}')
        procesesed.append(feedName)
        return



    with open(f'./_data/feeds/{feedName}.json', 'w') as f:
        json.dump(feedJson, f)

    knownFeeds = feedJson.get('knownFeeds', {})
    global feedQueue
    feedQueue = feedQueue + list(knownFeeds.items())

    procesesed.append(feedName)


if __name__ == "__main__":
    main()
