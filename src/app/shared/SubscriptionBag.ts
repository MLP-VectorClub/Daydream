import { Subscription } from 'rxjs';

export class SubscriptionBag {
  private subs: Subscription[] = [];

  push(subscription: Subscription) {
    this.subs.push(subscription);
  }

  unsubscribe() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }
}
