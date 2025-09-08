"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUsefulIndexes1755944520331 = void 0;
class AddUsefulIndexes1755944520331 {
    constructor() {
        this.name = "AddUsefulIndexes1755944520331";
    }
    async up(q) {
        await q.query(`
        CREATE INDEX IF NOT EXISTS idx_tx_installment
        ON transactions(installment_id)
        WHERE installment_id IS NOT NULL
      `);
        await q.query(`
        CREATE INDEX IF NOT EXISTS idx_tx_debt
        ON transactions(debt_id)
        WHERE debt_id IS NOT NULL
      `);
        await q.query(`
        CREATE INDEX IF NOT EXISTS idx_tx_user_type_date
        ON transactions(user_id, type, occurred_at DESC)
      `);
        await q.query(`
        CREATE INDEX IF NOT EXISTS idx_debts_user_active
        ON debts(user_id)
        WHERE is_closed = false
      `);
        await q.query(`
        CREATE INDEX IF NOT EXISTS idx_installments_user_active
        ON installments(user_id)
        WHERE is_closed = false
      `);
    }
    async down(q) {
        await q.query(`DROP INDEX IF EXISTS idx_installments_user_active`);
        await q.query(`DROP INDEX IF EXISTS idx_debts_user_active`);
        await q.query(`DROP INDEX IF EXISTS idx_tx_user_type_date`);
        await q.query(`DROP INDEX IF EXISTS idx_tx_debt`);
        await q.query(`DROP INDEX IF EXISTS idx_tx_installment`);
    }
}
exports.AddUsefulIndexes1755944520331 = AddUsefulIndexes1755944520331;
//# sourceMappingURL=1755944520331-add_useful_indexes.js.map