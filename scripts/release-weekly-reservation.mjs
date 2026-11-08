import { weeklyReservationKey } from './release-weekly-policy.mjs';

const namespace = 'heads/weekly-reservations/';

// Use GitHub's create-ref endpoint, never an update-capable branch helper.
export async function reserveWeeklySlot({ git, owner, repo, slot, evidenceCommit }) {
  if (typeof evidenceCommit !== 'string' || !/^[a-f0-9]{40}$/.test(evidenceCommit)) {
    throw new Error('A full evidence commit SHA is required');
  }
  const ref = namespace + weeklyReservationKey(slot);
  try {
    const created = await git.createRef({ owner, repo, ref: 'refs/' + ref, sha: evidenceCommit });
    if (created.status !== 201) throw new Error('Unexpected create-ref response');
    const { data } = await git.getRef({ owner, repo, ref });
    if (data.ref !== 'refs/' + ref || data.object?.type !== 'commit' || data.object.sha !== evidenceCommit) {
      throw new Error('Reservation readback does not match');
    }
  } catch (error) {
    throw new Error(`Weekly reservation was not confirmed for ${ref}; stop and reconcile`, { cause: error });
  }
  return 'refs/' + ref;
}
