# AI-Assisted Development

This template is optimized for AI-assisted development with Claude Code, Cursor, and other AI coding tools.

## MCP Configuration

The template includes `mcp.json` pre-configured for AIVA:

```json
{
  "mcpServers": {
    "aiva": {
      "command": "npx",
      "args": ["-y", "@aiva/mcp"],
      "env": {
        "AIVA_API_KEY": "${AIVA_API_KEY}"
      }
    }
  }
}
```

## CLAUDE.md Context

The `CLAUDE.md` file provides AI assistants with project context:

- Project overview and purpose
- Tech stack details
- Directory structure
- Key patterns and conventions
- Common customization tasks

Always keep `CLAUDE.md` updated as you customize the project.

## Effective Prompts

### Feature Development

**Adding a new page:**
```
Add a referral program page where customers can get their referral link,
see how many friends they've referred, and track their earned rewards.
Use the existing page patterns and AIVA API.
```

**Adding a component:**
```
Create a subscription card component that shows the product image,
name, price, next delivery date, and quick action buttons for
skip, pause, and manage. Match the existing design system.
```

### Customization

**Vertical customization:**
```
Convert this portal to a coffee subscription service. Add profile
fields for roast preference, brewing method, and grind size.
Update the dashboard to show coffee-specific information.
```

**Branding:**
```
Update the color scheme to use #2D5016 as the primary color.
Generate a full color palette and apply it consistently.
Add dark mode support.
```

### Bug Fixes

**Debugging:**
```
The subscription card isn't showing the next delivery date.
Check the data flow from the AIVA API through to the component
and fix the issue.
```

### Integration

**Adding features:**
```
Add push notification support for delivery reminders.
Request permission, store the subscription with AIVA,
and handle incoming notifications.
```

## AI Tool Setup

### Claude Code

1. Ensure `AIVA_API_KEY` is in your environment
2. The `.claude/mcp.json` or project `mcp.json` will be auto-detected
3. Start coding!

### Cursor

1. Create `.cursor/mcp.json` (copy from `mcp.json`)
2. Set `AIVA_API_KEY` in environment
3. Restart Cursor

### VS Code with Continue

1. Install Continue extension
2. Configure MCP in Continue settings
3. Set environment variable

## Best Practices

### 1. Keep Context Files Updated

Update `CLAUDE.md` when you:
- Add new features
- Change patterns
- Add new dependencies
- Modify the structure

### 2. Use Specific Prompts

Instead of:
```
Make the dashboard better
```

Use:
```
Add a widget to the dashboard that shows the customer's subscription
health score from AIVA, including factors like engagement, order
frequency, and risk level. Display it as a circular progress
indicator with color coding.
```

### 3. Reference Existing Patterns

```
Following the pattern in SubscriptionCard.tsx, create an OrderCard
component that displays order information with similar styling
and hover effects.
```

### 4. Iterate Incrementally

Break large features into steps:

```
Step 1: Create the data fetching hook for referrals
Step 2: Build the referral link display component
Step 3: Create the referrals list component
Step 4: Assemble the referral page
Step 5: Add to navigation
```

### 5. Test As You Go

```
After adding the feature, write a test that verifies:
1. The component renders with mock data
2. The API integration works
3. Error states are handled
```

## Available MCP Tools

With AIVA MCP configured, your AI assistant has access to:

### Customer Data
- `get_customer` - Fetch customer details
- `search_customers` - Search customers
- `get_rfm_segments` - Customer segmentation

### Subscriptions
- `list_subscriptions` - List subscriptions
- `get_subscription` - Get subscription details
- `subscription_actions` - Pause, resume, skip, cancel

### Shopify
- `shopify_get_products` - Product catalog
- `shopify_get_orders` - Order history
- `shopify_get_customer` - Shopify customer data

### Analytics
- `get_churn_risk` - Churn prediction

## Example Session

```
You: Add a feature that shows customers their churn risk score
and provides recommendations to improve it.

AI: I'll create this feature. Let me first check what data is
available from the AIVA API...

[AI uses get_churn_risk tool]

Based on the API, I can see we have access to:
- Risk score (0-100)
- Risk factors
- Recommended actions

I'll create:
1. A ChurnRiskWidget component
2. Add it to the dashboard
3. Style it with appropriate color coding

[AI writes code]

Done! The widget now shows on the dashboard. Customers with
high risk scores see specific recommendations like "Consider
pausing instead of canceling" or "Your delivery frequency
might be too high."
```
