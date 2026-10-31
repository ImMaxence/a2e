import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactId, ServiceId } from '../../core/content/content.types';
import { AGENCIES, CONTACTS, SERVICES } from '../../core/content/site.data';
import { I18n } from '../../core/i18n/i18n';
import { ExpertCard } from '../../shared/expert-card/expert-card';
import { Icon } from '../../shared/icon/icon';
import { Reveal } from '../../shared/motion/reveal';
import { PageHero } from '../../shared/page-hero/page-hero';

type Purpose = 'quote' | 'callback' | 'info' | 'other';
type ServiceChoice = ServiceId | 'other';

const PHONE = /^[+()\d\s.-]{8,20}$/;

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, PageHero, ExpertCard, Icon, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  /** Optional `?service=` query param, used to preselect the service. */
  readonly service = input<string>();

  protected readonly t = inject(I18n).t;
  protected readonly services = SERVICES;
  protected readonly agencies = AGENCIES;
  protected readonly contacts = CONTACTS;
  protected readonly contactIds = Object.keys(CONTACTS) as ContactId[];
  protected readonly civilities = ['mr', 'mrs'] as const;
  protected readonly purposes: Purpose[] = ['quote', 'callback', 'info', 'other'];
  protected readonly sent = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    civility: this.fb.control<'mr' | 'mrs' | ''>(''),
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    phone: ['', Validators.pattern(PHONE)],
    email: ['', [Validators.required, Validators.email]],
    kind: this.fb.control<'company' | 'individual'>('company'),
    companyName: [''],
    address: [''],
    zip: [''],
    city: [''],
    purpose: this.fb.control<Purpose>('quote'),
    service: this.fb.control<ServiceChoice>('other'),
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  private readonly kind = toSignal(this.form.controls.kind.valueChanges, { initialValue: 'company' as const });
  protected readonly isCompany = computed(() => this.kind() === 'company');

  private readonly selectedService = toSignal(this.form.controls.service.valueChanges, {
    initialValue: 'other' as ServiceChoice,
  });

  /** The experts who will receive the e-mail, based on the selected service. */
  protected readonly recipients = computed<ContactId[]>(() => {
    const id = this.selectedService();
    return id === 'other' ? this.contactIds : SERVICES.find((s) => s.id === id)!.contacts;
  });

  protected readonly messageLength = toSignal(this.form.controls.message.valueChanges, { initialValue: '' });

  constructor() {
    effect(() => {
      const preset = this.service();
      if (preset && SERVICES.some((s) => s.id === preset)) {
        this.form.controls.service.setValue(preset as ServiceId);
      }
    });
  }

  protected invalid(name: 'lastName' | 'firstName' | 'email' | 'phone' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.host.querySelector<HTMLElement>('.ng-invalid:not(form)')?.focus();
      return;
    }

    const dict = this.t();
    const c = dict.contact;
    const v = this.form.getRawValue();
    const fullName = `${v.firstName} ${v.lastName}`.trim();
    const purpose = c.purposes[v.purpose];
    const service = v.service === 'other' ? c.serviceOther : dict.services[v.service].nav;

    const lines = [
      `${c.purpose} : ${purpose}`,
      `${c.service} : ${service}`,
      '',
      v.message,
      '',
      '—',
      [v.civility ? c.civilities[v.civility] : '', fullName].filter(Boolean).join(' '),
      `${c.email} : ${v.email}`,
      v.phone && `${c.phone} : ${v.phone}`,
      `${c.kind} : ${c.kinds[v.kind]}`,
      v.kind === 'company' && v.companyName && `${c.companyName} : ${v.companyName}`,
      [v.address, [v.zip, v.city].filter(Boolean).join(' ')].filter(Boolean).join(', '),
    ].filter((line) => line !== false && line !== undefined);

    const to = this.recipients()
      .map((id) => CONTACTS[id].email)
      .join(',');
    const query = new URLSearchParams({ subject: c.mailSubject(purpose, fullName), body: lines.join('\n') });
    // URLSearchParams encodes spaces as "+", which mail clients keep literally.
    location.href = `mailto:${to}?${query.toString().replaceAll('+', '%20')}`;
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.sent.set(false);
  }
}
