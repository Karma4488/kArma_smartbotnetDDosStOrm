# safe_sim_single_target.py
import random, numpy as np, pandas as pd
from collections import defaultdict
from datetime import datetime

SIM_DURATION = 300
TIME = range(SIM_DURATION)

# simple legit traffic
def legit(t):
    return 120 + 12 * np.sin(2*np.pi*t/180.0) + np.random.normal(0,5)

# create a set of bots but concentrate on single target ip
def simulate_single_target(num_bots=800, target_ip="94.231.q03.79",
                           per_ip_limit=20, blacklist_threshold=50,
                           blacklist_duration=30, capacity=2000):
    # each bot offers some rps but all mapped to target_ip
    metrics = {"time":[], "inbound":[], "processed":[], "dropped":[], "blacklisted_count":[]}
    reputation = defaultdict(float)
    blacklist = {}
    for t in TIME:
        inbound_legit = max(0, legit(t))
        # attacker total
        total_attacker = 0.0
        for i in range(num_bots):
            # decide bot contribution (varied)
            r = random.random()
            if r < 0.6: base = random.uniform(0.2,1.2)
            elif r < 0.85: base = random.uniform(2,8)
            elif r < 0.96: base = random.uniform(8,32)
            else: base = random.uniform(0.1,1.6)
            total_attacker += base
        # all attacker offered to target IP
        offered_by_ip = {target_ip: total_attacker}
        # drop if blacklisted
        if target_ip in blacklist and blacklist[target_ip] > t:
            attacker_accepted = 0.0
            dropped_by_blacklist = total_attacker
        else:
            dropped_by_blacklist = 0.0
            # apply per-ip cap
            accepted = min(offered_by_ip[target_ip], per_ip_limit)
            # naive challenge: simulate half of attacker after challenge
            attacker_accepted = accepted * 0.5
            # reputation increases if offered > limit
            if offered_by_ip[target_ip] > per_ip_limit:
                reputation[target_ip] += (offered_by_ip[target_ip] - per_ip_limit) * 0.01
        inbound = inbound_legit + attacker_accepted
        processed = min(capacity, inbound)
        dropped_capacity = max(0, inbound - processed)
        # check blacklist
        for ip,score in list(reputation.items()):
            if score >= blacklist_threshold and ip not in blacklist:
                blacklist[ip] = t + blacklist_duration
        # simple reputation decay
        for ip in list(reputation.keys()):
            reputation[ip] = max(0, reputation[ip] - 0.005)
        metrics["time"].append(t)
        metrics["inbound"].append(inbound)
        metrics["processed"].append(processed)
        metrics["dropped"].append(dropped_capacity + dropped_by_blacklist)
        metrics["blacklisted_count"].append(len([1 for ip,u in blacklist.items() if u>t]))
    df = pd.DataFrame(metrics)
    fname = f"single_target_sim_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    df.to_csv(fname, index=False)
    print("Saved simulation to", fname)
    return df

if __name__ == "__main__":
    df = simulate_single_target()
    print(df.head())
