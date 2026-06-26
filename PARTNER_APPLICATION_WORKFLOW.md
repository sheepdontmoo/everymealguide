# Partner application workflow

## Purpose

Move toward 100+ affiliate/direct partner applications without pretending anything has been submitted.

## Command

```powershell
npm.cmd run partners:queue
```

## Output

```text
outreach/partner-application-operating-queue.csv
reports/partner-application-operating-queue.json
```

## Submission rule

Rows in the queue are preparation only. A row is not submitted until:

- the correct affiliate/direct route is confirmed
- the required publisher/network account is available
- the exact application or outreach message is approved
- the submission has explicit confirmation evidence

## Status labels

- `needs_human_submit`: ready/prepared but not submitted
- `submitted`: only after confirmed submission evidence
- `approved`: only after program acceptance
- `rejected`: only after explicit rejection
- `needs_research`: route/contact not confirmed

## Revenue rule

Do not replace offer-check pages with real affiliate URLs until the program approves Every Meal Guide and provides an approved tracking URL.
